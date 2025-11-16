package com.lostfound.backend.payload.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;

@Data
@Builder
public class PostResponseDTO {
        private int postId;
        private String title;
        private String description;
        private List<String> categories;
        private String location;
        private List<String> imageUrls;
        private boolean found;
        private String username; // show username instead of full User object
        //private String userProfileUrl;
        private LocalDateTime createdAt;
}
