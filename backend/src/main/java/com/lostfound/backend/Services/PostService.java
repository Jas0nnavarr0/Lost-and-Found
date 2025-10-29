package com.lostfound.backend.Services;

import com.lostfound.backend.model.Post;
import com.lostfound.backend.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    // @Autowired can delete this constructor
    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }
    // Create/ Modify/ Delete posts
    public Post createPost(Post post){
        return postRepository.save(post);
    }

    public Post updatePost(Post post){
        return postRepository.save(post);
    }

    public void deletePost(int id){
        postRepository.deleteById(id);
    }

    // Get posts
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post getPostById(int id){
        return postRepository.findById(id).orElse(new Post());
    }

    /*Search posts
    public List<Post> searchPosts(String keyword){
        return postRepository.searchPost(keyword);
    }*/
}
