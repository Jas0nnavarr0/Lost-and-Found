package com.lostfound.backend.controllers;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.dtos.PostDeleteResponseDTO;
import com.lostfound.backend.dtos.PostUpdateRequestDTO;
import com.lostfound.backend.dtos.PostRequestDTO;
import com.lostfound.backend.dtos.PostResponseDTO;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.repositories.PostRepository;
import com.lostfound.backend.services.PostService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173") // allow React
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    public PostController(PostService postService, PostRepository postRepository) {
        this.postService = postService;
        this.postRepository = postRepository;
    }

    // create
    @PostMapping
    public PostResponseDTO create(
            @RequestBody PostRequestDTO dto,
            @AuthenticationPrincipal UserDetailsImpl currentUser
    ) {
        return postService.savePost(dto, currentUser);
    }

    // edit post
    @PutMapping("/{id}")
    public PostResponseDTO updatePost(
            @PathVariable Long id,
            @RequestBody PostUpdateRequestDTO dto,
            @AuthenticationPrincipal UserDetailsImpl currentUser) {
        return postService.updatePost(id, dto, currentUser);
    }

    // delete post
    @DeleteMapping("/{id}")
    public PostDeleteResponseDTO deletePost(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl currentUser
    ) {
        return postService.deletePost(id, currentUser);
    }

    // return all posts
    @GetMapping
    public List<PostResponseDTO> getTests() {
        return postService.getAllUsers();
    }

    //@RequestMapping("/post/{id}")
}

