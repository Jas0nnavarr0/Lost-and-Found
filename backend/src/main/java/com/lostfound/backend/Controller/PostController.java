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


import java.util.ArrayList;
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
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequestDTO postDTO) {
        PostResponseDTO createdPost = postService.createPost(postDTO);
        return ResponseEntity.ok(createdPost);
    }


    // Used by browsers to display or open the uploaded image after it’s been saved.
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") List<MultipartFile> imageFiles) {
        try {
            // Folder where images will be saved
            String uploadDir = "uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            // Limit to 5 images
            if(imageFiles.size() > 5){
                return ResponseEntity.badRequest().body(List.of("Error: You can only upload up to 5 images only."));
            }

            List<String> imageUrls = new ArrayList<>();

            for(MultipartFile imageFile : imageFiles){
                // Create unique file name
                String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                // Save file locally
                Files.write(filePath, imageFile.getBytes());

                // Return image URL to the client
                String imageUrl = "/uploads/" + fileName;
                imageUrls.add(imageUrl);
            }

            return ResponseEntity.ok(imageUrls);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(List.of("Failed to upload image"));
        }
    }

    // update post
    @PutMapping("/posts/{Id}")
    public ResponseEntity<PostResponseDTO> updatePost(
            @PathVariable int Id,
            @RequestBody PostRequestDTO postDTO) {
        PostResponseDTO updatedPost = postService.updatePost(Id, postDTO);
        return ResponseEntity.ok(updatedPost);
    }

    // delete post
    @DeleteMapping("/posts/{Id}")
    public ResponseEntity<String> deletePost(@PathVariable int Id) {
        postService.deletePost(Id);
        return ResponseEntity.ok("Post deleted successfully");
    }
}
