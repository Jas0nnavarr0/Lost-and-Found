package com.lostfound.backend.messaging.dto;

import java.time.LocalDateTime;

public record MessageDTO(
        Long id,
        Long conversationId,
        Long senderId,
        String senderUsername,
        String content,
        LocalDateTime sentAt
) {
}
