package com.lostfound.backend.payload.dto;
import com.lostfound.backend.model.User;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostRequestDTO {
        private String title;
        private String description;
        private String categories;
        private String location;
        private String imageUrl;
        private List<Integer> categoryIds; // e.g. [1, 2, 3]
        //private String type;
        private int userId;
}
