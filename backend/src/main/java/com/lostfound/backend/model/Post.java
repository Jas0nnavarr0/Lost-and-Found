package com.lostfound.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    @Column(length = 1000, nullable = false)
    private String title;

    // connect to a user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Defines a foreign key
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ManyToMany
    @JoinTable(
            name = "post_categories",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    @Column(length = 100)
    private String location;

    @ElementCollection
    private List<String> imageUrls;

    @Column(name = "is_found")
    private boolean isFound = false;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    // JPA runs the following method right before the entity is inserted into the database for the first time.
    // automatically creates a createdAt time when the post is first saved
    @PrePersist
    protected void serCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }
}
