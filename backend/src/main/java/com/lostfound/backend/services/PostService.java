package com.lostfound.backend.services;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.dtos.*;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.model.User;
import com.lostfound.backend.repositories.PostRepository;
import com.lostfound.backend.repositories.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // create post
    public PostResponseDTO savePost(PostRequestDTO dto, UserDetailsImpl currentUser) {

        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (dto.getCategories().size() > 3) {
            throw new IllegalArgumentException("You can select up to 3 categories only.");
        }

        Post post = new Post(
                user,
                dto.getTitle(),
                dto.getDescription(),
                dto.getLocation(),
                dto.getCategories(),
                dto.getImages()
        );

        Post saved = postRepository.save(post);

        return new PostResponseDTO(
                saved.getId(),
                saved.getUser().getUsername(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getLocation(),
                saved.getCreatedAt(),
                saved.getCategories(),
                saved.getImages()
        );
    }

    // get all users
    public List<PostResponseDTO> getAllUsers() {
        return postRepository.findAll()
                .stream()
                .map(post -> new PostResponseDTO(
                        post.getId(),
                        post.getUser().getUsername(),
                        post.getTitle(),
                        post.getDescription(),
                        post.getLocation(),
                        post.getCreatedAt(),
                        post.getCategories(),
                        post.getImages()
                ))
                .collect(Collectors.toList());
    }

    // UPDATE POST
    public PostResponseDTO updatePost(Long id, PostUpdateRequestDTO dto, UserDetailsImpl currentUser) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // check author
        if (!post.getUser().getUserId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You cannot edit someone else's post");
        }

        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setLocation(dto.getLocation());
        post.setCategories(dto.getCategories());
        post.setImages(dto.getImages());

        Post saved = postRepository.save(post);

        return new PostResponseDTO(
                saved.getId(),
                saved.getUser().getUsername(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getLocation(),
                saved.getCreatedAt(),
                saved.getCategories(),
                saved.getImages()
        );
    }

    // DELETE POST
    public PostDeleteResponseDTO deletePost(Long id, UserDetailsImpl currentUser) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (!post.getUser().getUserId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You cannot delete someone else's post");
        }

        postRepository.delete(post);

        return new PostDeleteResponseDTO(id, "Deleted successfully");
    }
}


