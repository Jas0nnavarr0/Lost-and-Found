package com.lostfound.backend.configurations;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Enable Swagger to have UI of API Endpoints
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI swaggerAPI() {

        return new OpenAPI().info(new Info().title("Spring Boot Lost and Found API").version("1.0").description("Lost and Found project"));
    }
}
