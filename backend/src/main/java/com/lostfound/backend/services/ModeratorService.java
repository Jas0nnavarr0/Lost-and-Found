package com.lostfound.backend.services;

import com.lostfound.backend.dtos.ReportedPostDTO;
import com.lostfound.backend.messaging.model.Conversation;
import com.lostfound.backend.messaging.repository.ConversationRepository;
import com.lostfound.backend.messaging.repository.MessageRepository;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.repositories.PostReportRepository;
import com.lostfound.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModeratorService {

    @Autowired
    private PostReportRepository reportRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    public List<ReportedPostDTO> getReportedPosts() {
        return reportRepository.findAll().stream()
                .map(r -> new ReportedPostDTO(
                        r.getPost().getId(),
                        r.getPost().getTitle(),
                        r.getPost().getUser().getUsername(),
                        r.getId(),
                        r.getReason(),
                        r.getDetails(),
                        r.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public void deletePost(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        List<Conversation> conversations = conversationRepository.findByPost(post);

        for (Conversation convo : conversations) {
            messageRepository.deleteAllByConversation(convo);
        }

        conversationRepository.deleteAll(conversations);

        reportRepository.deleteAllByPost(post);

        postRepository.delete(post);
    }
}
