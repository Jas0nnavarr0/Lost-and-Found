package com.lostfound.backend.repositories;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
}
