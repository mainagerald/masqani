package com.masqani.masqani.listing.application;

import com.masqani.masqani.exceptions.StorageException;
import com.masqani.masqani.listing.application.dto.ImageUploadResponseDto;
import com.masqani.masqani.util.config.ImageCompressor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.Iterator;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AwsStorageService {

    private final S3Client s3Client;

    private final ImageCompressor imageCompressor;

    @Value("${cloud.aws.s3.bucket.name}")
    private String bucketName;

    @Value("${cloud.aws.s3.bucket.url-prefix}")
    private String urlPrefix;

    private static final String IMAGES_FOLDER="listing-images";

    private static final float COMPRESSION_QUALITY = 0.7f; // 70% quality
    private static final long MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes


    public ImageUploadResponseDto uploadFile(MultipartFile file) {
        validateFile(file);
        try {
            String fileName = generateUniqueFileName(file.getOriginalFilename());
            String folderPath = IMAGES_FOLDER + "/" + fileName;
            String contentType = file.getContentType();

            byte[] compressedImageBytes = imageCompressor.compressImage(file.getBytes(), contentType);

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(folderPath)
                    .contentType(contentType)
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromBytes(compressedImageBytes));

            String fileUrl = generateFileUrl(folderPath);

            ImageUploadResponseDto imageUploadResponseDto = new ImageUploadResponseDto();
            imageUploadResponseDto.setFileUrl(fileUrl);
            imageUploadResponseDto.setFileName(folderPath);
            imageUploadResponseDto.setContentType(contentType);
            imageUploadResponseDto.setSize(compressedImageBytes.length);

            return imageUploadResponseDto;
        } catch (IOException e) {
            log.error("Error uploading file to S3", e);
            throw new StorageException("Failed to upload file to S3", e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new StorageException("File is empty or null");
        }

        String contentType = file.getContentType();
        if (contentType == null || !isImageContentType(contentType)) {
            throw new StorageException("Invalid file type. Only images are allowed");
        }

//        if (file.getSize() > MAX_FILE_SIZE * 2) { // Allow slightly larger files pre-compression
//            throw new StorageException("File size exceeds maximum limit");
//        }
    }

    private boolean isImageContentType(String contentType) {
        return contentType.startsWith("image/");
    }

//    private byte[] compressImage(MultipartFile file) throws IOException {
//        BufferedImage originalImage = ImageIO.read(file.getInputStream());
//
//        // If image couldn't be read, return original bytes
//        if (originalImage == null) {
//            return file.getBytes();
//        }
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//
//        // Get image writer for JPEG format
//        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpg");
//        if (!writers.hasNext()) {
//            throw new StorageException("No writer available for JPEG format");
//        }
//
//        ImageWriter writer = writers.next();
//        ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream);
//        writer.setOutput(imageOutputStream);
//
//        ImageWriteParam params = writer.getDefaultWriteParam();
//        params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
//        params.setCompressionQuality(COMPRESSION_QUALITY);
//
//        writer.write(null, new IIOImage(originalImage, null, null), params);
//
//        writer.dispose();
//        imageOutputStream.close();
//
//        return outputStream.toByteArray();
//    }

    public void deleteFile(String fileName) {
        try {
            String folderPath = IMAGES_FOLDER + "/" + fileName;
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(folderPath)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
        } catch (S3Exception e) {
            log.error("Error deleting file from S3", e);
            throw new StorageException("Failed to delete file from S3", e);
        }
    }

    public boolean fileExists(String fileName) {
        try {
            String folderPath = IMAGES_FOLDER + "/" + fileName;
            HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(folderPath)
                    .build();

            s3Client.headObject(headObjectRequest);
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }

    private String generateUniqueFileName(String originalFileName) {
        String extension = getFileExtension(originalFileName);
        return UUID.randomUUID() + extension;
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private String generateFileUrl(String folderPath) {
        return urlPrefix + "/" + folderPath;
    }
}