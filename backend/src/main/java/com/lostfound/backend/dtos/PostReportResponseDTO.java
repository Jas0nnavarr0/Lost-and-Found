package com.lostfound.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PostReportResponseDTO {
    private Long id;
    private Long postId;
    private String reporter;
    private String reason;
    private String details;
    private LocalDateTime createdAt;
}
