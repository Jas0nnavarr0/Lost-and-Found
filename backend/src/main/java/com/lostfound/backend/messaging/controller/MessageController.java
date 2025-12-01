package com.lostfound.backend.messaging.controller;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.messaging.dto.MessageDTO;
import com.lostfound.backend.messaging.model.Message;
import com.lostfound.backend.messaging.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/{conversationId}")
    public Message send(@PathVariable Long conversationId,
            @RequestBody String content,
            @AuthenticationPrincipal UserDetailsImpl currentUser
    ) {
        return messageService.sendMessage(conversationId, content, currentUser);
    }

    @GetMapping("/{conversationId}")
    public List<MessageDTO> getMessages(
            @PathVariable Long conversationId,
            @AuthenticationPrincipal UserDetailsImpl currentUser
    ) {
        return messageService.getMessages(conversationId, currentUser);
    }
}
