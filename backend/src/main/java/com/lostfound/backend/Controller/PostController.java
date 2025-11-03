package com.lostfound.backend.Controller;

import com.lostfound.backend.dto.PostRequestDTO;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.Services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public List<Post> getPosts() {
        return postService.getAllPosts();
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
}
