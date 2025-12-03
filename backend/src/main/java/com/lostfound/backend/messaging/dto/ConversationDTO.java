package com.lostfound.backend.messaging.dto;

import java.time.LocalDateTime;

public record ConversationDTO(
        Long id,
        Long postId,
        String postTitle,
        Long user1Id,
        String user1Username,
        Long user2Id,
        String user2Username,
        LocalDateTime createdAt
) {
}
