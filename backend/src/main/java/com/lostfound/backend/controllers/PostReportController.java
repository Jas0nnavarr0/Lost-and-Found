package com.lostfound.backend.controllers;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.dtos.PostReportRequestDTO;
import com.lostfound.backend.dtos.PostReportResponseDTO;
import com.lostfound.backend.services.PostReportService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class PostReportController {

    private final PostReportService reportService;

    public PostReportController(PostReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/{postId}")
    public PostReportResponseDTO reportPost(
            @PathVariable Long postId,
            @RequestBody PostReportRequestDTO dto,
            @AuthenticationPrincipal UserDetailsImpl currentUser
    ) {
        return reportService.createReport(postId, dto, currentUser);
    }

    // OPTIONAL: admin-only view of reports
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<PostReportResponseDTO> getAllReports() {
        return null;
    }
}
