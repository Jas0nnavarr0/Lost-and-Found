package com.lostfound.backend.Services;

import com.lostfound.backend.dto.PostRequestDTO;
import com.lostfound.backend.dto.PostResponseDTO;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    private final PostRepository postRepository;

    // @Autowired can delete this constructor
    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }
    // Create/ Modify/ Delete posts
    public Post createPost(PostRequestDTO dto){
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setLocation(dto.getLocation());
        post.setCategories(dto.getCategories());
        post.setFound(dto.isFound());
        post.setImageUrl(dto.getImageUrl());

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
