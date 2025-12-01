package com.lostfound.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    public String save(MultipartFile file) {
        try {
            String folder = "uploads/";
            Path path = Paths.get(folder);

            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = path.resolve(fileName);

            Files.write(filePath, file.getBytes());

            return "http://localhost:5000/uploads/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
