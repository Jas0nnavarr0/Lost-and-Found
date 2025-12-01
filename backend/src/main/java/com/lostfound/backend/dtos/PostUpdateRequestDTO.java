package com.lostfound.backend.dtos;

import com.lostfound.backend.model.Category;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PostUpdateRequestDTO {
    private String title;
    private String description;
    private String location;
    private List<Category> categories;
    private List<String> images;
}