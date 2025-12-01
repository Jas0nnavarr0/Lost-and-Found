package com.lostfound.backend.messaging.service;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import com.lostfound.backend.messaging.model.Conversation;
import com.lostfound.backend.messaging.model.Message;
import com.lostfound.backend.messaging.repository.ConversationRepository;
import com.lostfound.backend.messaging.repository.MessageRepository;
import com.lostfound.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepo;

    @Autowired
    private ConversationRepository conversationRepo;

    @Autowired
    private UserRepository userRepo;

    public Message sendMessage(Long conversationId, String content, UserDetailsImpl sender) {

        Conversation convo = conversationRepo.findById(conversationId).orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

        Long userId = sender.getId();

        if (!convo.getUser1().getUserId().equals(userId) &&
                !convo.getUser2().getUserId().equals(userId)) {
            throw new AccessDeniedException("You are not part of this conversation");
        }

        Message m = new Message();
        m.setConversation(convo);
        m.setSender(userRepo.findById(userId).get());
        m.setContent(content);

        return messageRepo.save(m);
    }

    public List<Message> getMessages(Long conversationId, UserDetailsImpl currentUser) {

        Conversation convo = conversationRepo.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

        Long userId = currentUser.getId();
        if (!convo.getUser1().getUserId().equals(userId) &&
                !convo.getUser2().getUserId().equals(userId)) {
            throw new AccessDeniedException("Not part of this conversation");
        }

        return messageRepo.findByConversationOrderBySentAtAsc(convo);
    }
}
