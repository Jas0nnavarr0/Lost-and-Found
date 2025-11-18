package com.lostfound.backend.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// Enable JPA to audit entries, for example, being able to use createdAt
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
