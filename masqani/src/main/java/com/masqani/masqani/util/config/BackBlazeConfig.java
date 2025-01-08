package com.masqani.masqani.util.config;

import com.backblaze.b2.client.B2StorageClient;
import com.backblaze.b2.client.B2StorageClientFactory;
import com.backblaze.b2.client.structures.B2Bucket;
import com.backblaze.b2.client.structures.B2ListBucketsResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class BackBlazeConfig {
    @Value("${b2.application-key-id}")
    private String applicationKeyId;

    @Value("${b2.application-key}")
    private String applicationKey;

    @Value("${b2.bucket-name}")
    private String bucketName;

    @Bean
    public B2StorageClient b2Client() throws Exception {
        B2StorageClient client = B2StorageClientFactory
                .createDefaultFactory()
                .create(applicationKeyId, applicationKey, "masqani-app/1.0");

        // Verify bucket exists and get its ID
        B2ListBucketsResponse buckets = client.listBuckets();
        B2Bucket bucket = buckets.getBuckets().stream()
                .filter(b -> b.getBucketName().equals(bucketName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Bucket not found: " + bucketName));

        log.info("Successfully connected to B2 bucket: {}", bucketName);
        return client;
    }
}
