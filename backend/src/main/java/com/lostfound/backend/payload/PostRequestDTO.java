package com.lostfound.backend.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostRequestDTO {
        private String title;
        private String description;
        private String categories;
        private String location;
        private List<String> imageUrls;
        private List<Integer> categoryIds; // e.g. [1, 2, 3]
        //private String type;
        private int userId;
}
