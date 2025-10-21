package com.lostfound.backend.security;

import com.lostfound.backend.model.AppRole;
import com.lostfound.backend.model.Role;
import com.lostfound.backend.repositories.RoleRepository;
import com.lostfound.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    // Encoder bean to store hashed passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Retrieve or create roles
            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseGet(() -> {
                        Role newUserRole = new Role(AppRole.ROLE_USER);
                        return roleRepository.save(newUserRole);
                    });

            Role moderatorRole = roleRepository.findByRoleName(AppRole.ROLE_MODERATOR)
                    .orElseGet(() -> {
                        Role newModeratorRole = new Role(AppRole.ROLE_MODERATOR);
                        return roleRepository.save(newModeratorRole);
                    });

            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                    .orElseGet(() -> {
                        Role newAdminRole = new Role(AppRole.ROLE_ADMIN);
                        return roleRepository.save(newAdminRole);
                    });
        };
    }
}
