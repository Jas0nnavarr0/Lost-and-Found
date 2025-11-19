package com.lostfound.backend.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Cors implements WebMvcConfigurer {

    @Value("${frontend.url}")
    String url;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(url) // frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true).allowedHeaders("*");
    }
}
