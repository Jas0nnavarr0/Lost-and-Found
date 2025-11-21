package com.lostfound.backend.controllers;

import com.lostfound.backend.model.EnumRole;
import com.lostfound.backend.model.Role;
import com.lostfound.backend.model.User;
import com.lostfound.backend.repositories.RoleRepository;
import com.lostfound.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<?> getRegularUsers() {
        return ResponseEntity.ok(userRepository.findRegularUsers());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/moderators")
    public ResponseEntity<?> getModerators() {
        return ResponseEntity.ok(userRepository.findModeratorsOnly());

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/grant-mod/{userId}")
    public ResponseEntity<?> grantModerator(@PathVariable Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = optionalUser.get();

        Role moderatorRole = roleRepository.findByRoleName(EnumRole.ROLE_MODERATOR)
                .orElseThrow(() -> new RuntimeException("Moderator role not found"));

        user.getRoles().add(moderatorRole);
        userRepository.save(user);

        return ResponseEntity.ok("Moderator role granted.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/revoke-mod/{userId}")
    public ResponseEntity<?> revokeModerator(@PathVariable Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = optionalUser.get();

        // Checks so that you cannot remove mod from admin
        boolean isAdmin = user.getRoles().stream()
                .anyMatch(r -> r.getRoleName() == EnumRole.ROLE_ADMIN);
        if (isAdmin) {
            return ResponseEntity.badRequest().body("Cannot revoke moderator from an admin.");
        }

        Role moderatorRole = roleRepository.findByRoleName(EnumRole.ROLE_MODERATOR)
                .orElseThrow(() -> new RuntimeException("Moderator role not found"));

        boolean removed = user.getRoles().removeIf(r ->
                r.getRoleName() == EnumRole.ROLE_MODERATOR
        );
        if (!removed) {
            return ResponseEntity.badRequest().body("User is not a moderator.");
        }

        userRepository.save(user);
        return ResponseEntity.ok("Moderator role revoked.");
    }

}
