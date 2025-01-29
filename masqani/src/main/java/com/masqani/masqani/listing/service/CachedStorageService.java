package com.masqani.masqani.listing.service;

import com.masqani.masqani.listing.model.dto.ImageUploadResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class CachedStorageService {

    private final AwsStorageService awsStorageService;
    private static final String IMAGE_CACHE = "images";

    @Cacheable(value = IMAGE_CACHE, key = "#fileName")
    public byte[] getImage(String fileName) {
        // Implementation to fetch from S3
        // This would need to be added to your AwsStorageService
        return awsStorageService.getFile(fileName);
    }

    @CacheEvict(value = IMAGE_CACHE, key = "#fileName")
    public void deleteImage(String fileName) {
        awsStorageService.deleteFile(fileName);
    }

    public ImageUploadResponseDto uploadFile(MultipartFile file) {
        return awsStorageService.uploadFile(file);
    }
}