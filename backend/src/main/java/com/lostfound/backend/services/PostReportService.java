package com.lostfound.backend.services;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.dtos.PostReportRequestDTO;
import com.lostfound.backend.dtos.PostReportResponseDTO;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.model.PostReport;
import com.lostfound.backend.model.User;
import com.lostfound.backend.repositories.PostReportRepository;
import com.lostfound.backend.repositories.PostRepository;
import com.lostfound.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostReportService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostReportRepository reportRepository;

    public PostReportResponseDTO createReport(Long postId, PostReportRequestDTO dto, UserDetailsImpl currentUser) {

        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (post.getUser().getUserId().equals(user.getUserId())) {
            throw new IllegalArgumentException("You cannot report your own post.");
        }

        PostReport report = new PostReport(
                null,
                user,
                post,
                dto.getReason(),
                dto.getDetails(),
                null
        );

        PostReport saved = reportRepository.save(report);

        return new PostReportResponseDTO(
                saved.getId(),
                saved.getPost().getId(),
                saved.getReporter().getUsername(),
                saved.getReason(),
                saved.getDetails(),
                saved.getCreatedAt()
        );
    }
}
