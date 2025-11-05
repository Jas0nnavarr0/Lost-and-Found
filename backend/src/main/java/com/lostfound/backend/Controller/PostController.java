package com.lostfound.backend.Controller;

import com.lostfound.backend.payload.dto.PostRequestDTO;
import com.lostfound.backend.payload.dto.PostResponseDTO;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.Services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// image
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


import java.util.List;

// Only send data to users, rather than entire HTML
@RestController
//@RequestMapping("/api/posts")
//@CrossOrigin
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @RequestMapping("/post/{id}")
    public Post getPostById(@PathVariable int id){
        return postService.getPostById(id);
    }

    @PostMapping("/create_post")
    public ResponseEntity<Post> createPost(@RequestBody PostRequestDTO postDTO) {
        Post created = postService.createPost(postDTO);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile imageFile) {
        try {
            // Folder where images will be saved
            String uploadDir = "uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            // Create unique file name
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            // Save file locally
            Files.write(filePath, imageFile.getBytes());

            // Return image URL to the client
            String imageUrl = "/uploads/" + fileName;
            return ResponseEntity.ok(imageUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to upload image");
        }
    }
}
