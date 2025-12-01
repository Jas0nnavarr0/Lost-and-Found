package com.lostfound.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tests")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String description;

    @Column(length = 100)
    private String location;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    // JPA runs the following method right before the entity is inserted into the database for the first time.
    // automatically creates a createdAt time when the post is first saved
    @PrePersist
    protected void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }

    @ElementCollection(targetClass = Category.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "test_categories", joinColumns = @JoinColumn(name = "test_id"))
    @Column(name = "category")
    private List<Category> categories;

    @ElementCollection
    @CollectionTable(name = "test_images", joinColumns = @JoinColumn(name = "test_id"))
    @Column(name = "image_url")
    private List<String> images;

    //@Column(name = "is_found")
    //private boolean isFound = false;

    public Post(User user, String title, String description, String location, List<Category> categories, List<String> images) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.location = location;
        this.categories = categories;
        this.images = images;
    }

}

