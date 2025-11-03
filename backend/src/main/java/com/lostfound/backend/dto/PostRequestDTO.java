package com.lostfound.backend.dto;
import com.lostfound.backend.model.User;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostRequestDTO {
        private String title;
        private String description;
        private String categories;
        private String location;
        private String imageUrl;
        private boolean found;
        //private String type;
        private int userId;
}
