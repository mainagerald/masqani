package com.masqani.masqani.util.config;

import org.springframework.stereotype.Component;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;

@Component
public class ImageCompressor {
    private static final int MAX_SIZE_KB = 300;

    public byte[] compressImage(byte[] imageData, String contentType) throws IOException {
        // Read the image
        BufferedImage originalImage = ImageIO.read(new ByteArrayInputStream(imageData));

        if (originalImage == null) {
            throw new IOException("Failed to read image data");
        }

        // Calculate initial quality
        float quality = 1.0f;
        byte[] compressedImageData;

        do {
            compressedImageData = compressWithQuality(originalImage, quality, contentType);

            quality -= 0.1f;
        } while (compressedImageData.length > MAX_SIZE_KB * 1024 && quality > 0.1f);

        return compressedImageData;
    }

    private byte[] compressWithQuality(BufferedImage image, float quality, String contentType) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Choose appropriate writer based on content type
        String formatName = contentType.toLowerCase().contains("png") ? "PNG" : "JPEG";

        if (formatName.equals("JPEG")) {
            // For JPEG images
            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(formatName);
            ImageWriter writer = writers.next();
            ImageWriteParam params = writer.getDefaultWriteParam();

            params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            params.setCompressionQuality(quality);

            ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream);
            writer.setOutput(imageOutputStream);
            writer.write(null, new IIOImage(image, null, null), params);
            writer.dispose();
        } else {

            ImageIO.write(image, formatName, outputStream);
        }

        return outputStream.toByteArray();
    }
}