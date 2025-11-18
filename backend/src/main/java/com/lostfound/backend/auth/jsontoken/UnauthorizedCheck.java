package com.lostfound.backend.auth.jsontoken;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class UnauthorizedCheck implements AuthenticationEntryPoint {

    // Handle unauthorized access
    @Override
    public void commence(HttpServletRequest servletRequest, HttpServletResponse servletResponse,
                         AuthenticationException exception) throws IOException {
        servletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
        servletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Create response body
        final Map<String, Object> response = new HashMap<>();
        response.put("auth", HttpServletResponse.SC_UNAUTHORIZED);
        response.put("auth error", "Unauthorized");
        response.put("exception", exception.getMessage());
        response.put("sevlet path", servletRequest.getServletPath());

        final ObjectMapper objMapper = new ObjectMapper();
        objMapper.writeValue(servletResponse.getOutputStream(), response);

    }
}
