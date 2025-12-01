package com.lostfound.backend.controllers;

import com.lostfound.backend.services.ImageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")
public class UploadController {

    private final ImageService fileStorageService;

    public UploadController(ImageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) {
        System.out.println("UPLOAD ENDPOINT HIT: " + file.getOriginalFilename());
        String url = fileStorageService.save(file);
        System.out.println("Saved URL = " + url);
        return Map.of("url", url);
    }
}

