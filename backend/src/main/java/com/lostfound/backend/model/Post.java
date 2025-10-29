package com.lostfound.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @JoinColumn(name = "user_name") // Defines a foreign key
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(length = 3)
    private String categories;

    @Column(length = 100)
    private String location;

    //?
    private String imageUrl;

    @Column(name = "state")
    private boolean isFound = false;

    //?
    private LocalDate dataReported;

    @Column
    private LocalDateTime createdAt;
}
