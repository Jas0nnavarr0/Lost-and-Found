package com.lostfound.backend.messaging.service;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.messaging.model.Conversation;
import com.lostfound.backend.messaging.repository.ConversationRepository;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.model.User;
import com.lostfound.backend.repositories.PostRepository;
import com.lostfound.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PostRepository postRepo;


    public Conversation startConversation(Long postId, UserDetailsImpl currentUser) {

        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        Long u1 = currentUser.getId();
        Long u2 = post.getUser().getUserId();

        if (u1.equals(u2))
            throw new IllegalArgumentException("You cannot message yourself.");

        Long min = Math.min(u1, u2);
        Long max = Math.max(u1, u2);

        return conversationRepo.findByUsersAndPost(postId, min, max)
                .orElseGet(() -> {
                    Conversation c = new Conversation();
                    c.setPost(post);
                    c.setUser1(userRepo.findById(min).get());
                    c.setUser2(userRepo.findById(max).get());
                    return conversationRepo.save(c);
                });
    }

    public List<Conversation> getMyConversations(UserDetailsImpl currentUser) {
        User u = userRepo.findById(currentUser.getId()).orElseThrow();
        return conversationRepo.findByUser1OrUser2(u, u);
    }
}
