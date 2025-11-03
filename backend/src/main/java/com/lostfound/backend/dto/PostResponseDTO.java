package com.lostfound.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostResponseDTO {
        private int postId;
        private String title;
        private String description;
        private String categories;
        private String location;
        private String imageUrl;
        private boolean found;
        private String username; // show username instead of full User object
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
}
