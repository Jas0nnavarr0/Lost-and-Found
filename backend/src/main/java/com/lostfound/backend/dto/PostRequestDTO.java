package com.lostfound.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequestDTO {
        private String title;
        private String description;
        private String location;
        private String type;
        private int userId;
}
