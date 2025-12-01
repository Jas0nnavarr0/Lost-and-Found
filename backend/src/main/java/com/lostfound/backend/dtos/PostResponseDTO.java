package com.lostfound.backend.dtos;
import com.lostfound.backend.model.Category;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PostResponseDTO {
    private Long id;
    private String username;
    private String title;
    private String description;
    private String location;
    private LocalDateTime createdAt;
    private List<Category> categories;
    private List<String> images;


    public PostResponseDTO(Long id, String username, String title, String description, String location, LocalDateTime createdAt, List<Category> categories, List<String> images) {
        this.id = id;
        this.username = username;
        this.title = title;
        this.description = description;
        this.location = location;
        this.createdAt = createdAt;
        this.categories = categories;
        this.images = images;

    }

}
