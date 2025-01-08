package com.masqani.masqani.listing.application;

import com.backblaze.b2.client.B2StorageClient;
import com.backblaze.b2.client.exceptions.B2Exception;
import com.backblaze.b2.client.structures.*;
import com.backblaze.b2.client.contentSources.B2FileContentSource;
import com.masqani.masqani.listing.application.dto.ImageUploadResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BackBlazeService {

    private final B2StorageClient b2Client;

    @Value("${b2.bucket-name}")
    private String bucketName;

    @Value("${b2.url-expiration}")
    private Integer urlExpirationSeconds;

    public ImageUploadResponseDto uploadFile(MultipartFile file) throws IOException, B2Exception {
        String fileName = generateUniqueKey(Objects.requireNonNull(file.getOriginalFilename()));

        // Create content source from the MultipartFile
        B2FileContentSource contentSource = B2FileContentSource.build((File) file);

        // Upload the file
        B2UploadFileRequest uploadRequest = B2UploadFileRequest.builder(
                getBucketId(),
                fileName,
                file.getContentType(),
                contentSource
        ).build();

        B2FileVersion fileVersion = b2Client.uploadSmallFile(uploadRequest);

        // Generate download URL
        String downloadUrl = getDownloadUrl(fileVersion.getFileName());

        return new ImageUploadResponseDto(downloadUrl, fileName);
    }

    public void deleteFile(String fileName) throws B2Exception {
        B2ListFileNamesRequest listRequest = B2ListFileNamesRequest.builder(getBucketId())
                .setPrefix(fileName)
                .setMaxFileCount(1)
                .build();

        B2ListFileNamesResponse fileList = (B2ListFileNamesResponse) b2Client.fileNames(listRequest);

        if (!fileList.getFiles().isEmpty()) {
            B2FileVersion file = fileList.getFiles().get(0);
            B2DeleteFileVersionRequest deleteRequest = B2DeleteFileVersionRequest.builder(
                    file.getFileName(),
                    file.getFileId()
            ).build();

            b2Client.deleteFileVersion(deleteRequest);
        }
    }

    private String getBucketId() throws B2Exception {
        return b2Client.listBuckets()
                .getBuckets()
                .stream()
                .filter(bucket -> bucket.getBucketName().equals(bucketName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Bucket not found: " + bucketName))
                .getBucketId();
    }

    private String getDownloadUrl(String fileName) throws B2Exception {
        B2GetDownloadAuthorizationRequest authRequest = B2GetDownloadAuthorizationRequest
                .builder(getBucketId(), fileName, urlExpirationSeconds)
                .build();

        B2DownloadAuthorization auth = b2Client.getDownloadAuthorization(authRequest);

        return String.format("https://f002.backblazeb2.com/file/%s/%s?Authorization=%s",
                bucketName,
                fileName,
                auth.getAuthorizationToken());
    }

    private String generateUniqueKey(String originalFilename) {
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return String.format("listings/%s%s",
                UUID.randomUUID().toString(),
                extension.toLowerCase());
    }
}