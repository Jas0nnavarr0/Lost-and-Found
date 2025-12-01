package com.lostfound.backend.messaging.repository;

import com.lostfound.backend.messaging.model.Conversation;
import com.lostfound.backend.messaging.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationOrderBySentAtAsc(Conversation conversation);
}
