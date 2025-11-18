package com.lostfound.backend.services;

import com.lostfound.backend.model.Category;
import com.lostfound.backend.dtos.PostRequestDTO;
import com.lostfound.backend.dtos.PostResponseDTO;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.repositories.CategoryRepository;
import com.lostfound.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    // @Autowired can delete this constructor
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // Create/ Modify/ Delete posts
    public PostResponseDTO createPost(PostRequestDTO postDTO) {
        if (postDTO.getCategoryIds().size() > 3) {
            throw new IllegalArgumentException("You can select up to three categories only");
        }

        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setDescription(postDTO.getDescription());
        post.setLocation(postDTO.getLocation());

        // get the category entities by their id
        List<Category> categories = categoryRepository.findAllById(postDTO.getCategoryIds());
        post.setCategories(categories);

        //post.setFound(postDTO.isFound());
        post.setImageUrls(postDTO.getImageUrls());

        // Save the post
        Post savedPost = postRepository.save(post);

        // Return as DTO
        return mapToResponseDTO(savedPost);
    }

    // update post
    public PostResponseDTO updatePost(int postId, PostRequestDTO dto) {
        // Find the post by ID
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        /* Check if user is allowed to update (author check)
        if (post.getUser().getUserId() != dto.getUserId()) {
            throw new RuntimeException("You are not allowed to edit this post");
        }*/

        // Update basic fields
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setLocation(dto.getLocation());
        post.setImageUrls(dto.getImageUrls());
        //post.setFound(dto.isFound()); // if found field exists in PostRequestDTO

        // Update categories using categoryIds
        if (dto.getCategoryIds() != null && !dto.getCategoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(dto.getCategoryIds());
            post.setCategories(categories);
        }

        // Save the updated post
        Post savedPost = postRepository.save(post);

        // Convert to DTO for response
        return mapToResponseDTO(savedPost);
    }

    public void deletePost(int postId) {
        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("Post not found");
        }
        postRepository.deleteById(postId);
    }

    // Get posts
    public List<PostResponseDTO> getAllPosts() {
        // convert each Post -> PostResponseDTO
        return postRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // Convert Post -> DTO
    private PostResponseDTO mapToResponseDTO(Post post) {
        List<String> categoryNames = post.getCategories()
                .stream()
                .map(Category::getCategoryName)
                .collect(Collectors.toList());

        return PostResponseDTO.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .description(post.getDescription())
                .categories(categoryNames)
                .location(post.getLocation())
                .found(post.isFound())
                .username(post.getUser() != null ? post.getUser().getUsername() : null)
                //.(post.getUser().getProfileImageUrl());
                .createdAt(post.getCreatedAt())
                .build();
    }

    public Post getPostById(int id) {
        return postRepository.findById(id).orElse(new Post());
    }

    /*Search posts
    public List<Post> searchPosts(String keyword){
        return postRepository.searchPost(keyword);
    }*/
}
