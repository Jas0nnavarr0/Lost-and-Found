package com.lostfound.backend.messaging.controller;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.messaging.model.Conversation;
import com.lostfound.backend.messaging.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private  ConversationService convoService;

    @PostMapping("/start/{postId}")
    public Conversation start(
            @PathVariable Long postId,
            @AuthenticationPrincipal UserDetailsImpl currentUser
    ) {
        return convoService.startConversation(postId, currentUser);
    }

    @GetMapping
    public List<Conversation> mine(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        return convoService.getMyConversations(currentUser);
    }
}
