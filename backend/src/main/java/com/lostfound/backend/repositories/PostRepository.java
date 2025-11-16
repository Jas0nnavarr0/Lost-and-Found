package com.lostfound.backend.repositories;

import com.lostfound.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    /* define our own query method (JPQL)
    @Query("SELECT p from Post p WHERE " + "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Post> searchPost(String keyword);*/
}
