package com.lostfound.backend.Services;

import com.lostfound.backend.model.Category;
import com.lostfound.backend.payload.dto.PostRequestDTO;
import com.lostfound.backend.payload.dto.PostResponseDTO;
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
    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }
    // Create/ Modify/ Delete posts
    public Post createPost(PostRequestDTO postDTO){
        if (postDTO.getCategoryIds().size() > 3) {
            throw new IllegalArgumentException("You can select up to three categories only")
        }
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setDescription(postDTO.getDescription());
        post.setLocation(postDTO.getLocation());
        // get the category entities by their id
        List<Category> categories = categoryRepository.findAllById(postDTO.getCategoryIds());
        post.setCategories(categories);

        //post.setFound(postDTO.isFound());
        post.setImageUrl(postDTO.getImageUrl());

        return postRepository.save(post);
    }

    public Post updatePost(Post post){
        return postRepository.save(post);
    }

    public void deletePost(int id){
        postRepository.deleteById(id);
    }

    // Get posts
    public List<PostResponseDTO> getAllPosts(){
        // convert each Post -> PostResponseDTO
        return postRepository.findAll().stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }
    // Convert Post -> DTO
    private PostResponseDTO mapToResponseDTO(Post post) {
        return PostResponseDTO.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .description(post.getDescription())
                .categories(post.getCategories())
                .location(post.getLocation())
                .found(post.isFound())
                .username(post.getUser().getUsername())
                .createdAt(post.getCreatedAt())
                .build();
    }

    public Post getPostById(int id){
        return postRepository.findById(id).orElse(new Post());
    }

    /*Search posts
    public List<Post> searchPosts(String keyword){
        return postRepository.searchPost(keyword);
    }*/
}
