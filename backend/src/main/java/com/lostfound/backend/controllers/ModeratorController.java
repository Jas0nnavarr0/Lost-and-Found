package com.lostfound.backend.controllers;

import com.lostfound.backend.dtos.ReportedPostDTO;
import com.lostfound.backend.services.ModeratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moderator")
@PreAuthorize("hasRole('MODERATOR')")
public class ModeratorController {

    private final ModeratorService moderatorService;

    public ModeratorController(ModeratorService moderatorService) {
        this.moderatorService = moderatorService;
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity<?> deletePostAsModerator(@PathVariable Long postId) {
        moderatorService.deletePost(postId);
        return ResponseEntity.ok("Post deleted by moderator.");
    }

    @GetMapping("/reports")
    public List<ReportedPostDTO> getReportedPosts() {
        return moderatorService.getReportedPosts();
    }
}
