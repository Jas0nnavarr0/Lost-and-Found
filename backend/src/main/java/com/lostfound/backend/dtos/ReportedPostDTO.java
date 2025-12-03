package com.lostfound.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReportedPostDTO {
    private Long postId;
    private String title;
    private String ownerUsername;

    private Long reportId;
    private String reason;
    private String details;
    private LocalDateTime reportedAt;
}
