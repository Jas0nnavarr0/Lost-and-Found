package com.lostfound.backend.messaging.repository;

import com.lostfound.backend.messaging.model.Conversation;
import com.lostfound.backend.model.Post;
import com.lostfound.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("""
        SELECT c FROM Conversation c
        WHERE c.post.id = :postId 
        AND (
              (c.user1.userId = :u1 AND c.user2.userId = :u2)
           OR (c.user1.userId = :u2 AND c.user2.userId = :u1)
        )
    """)
    Optional<Conversation> findByUsersAndPost(Long postId, Long u1, Long u2);

    List<Conversation> findByUser1OrUser2(User u1, User u2);

    List<Conversation> findByPost(Post post);

}
