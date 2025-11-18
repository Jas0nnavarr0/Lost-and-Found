package com.lostfound.backend.auth.jsontoken;

import com.lostfound.backend.auth.custom_user_details.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private TokenUtilities tokenUtilities;

    private String retrieveToken(HttpServletRequest servletRequest) {
        String jwtCookie = tokenUtilities.retrieveTokenInCookies(servletRequest);
        if(jwtCookie != null) {
            return jwtCookie;
        }
        String jwtHeader = tokenUtilities.retrieveTokenInHeader(servletRequest);
        if(jwtHeader != null) {
            return jwtHeader;
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest servletRequest, HttpServletResponse servletResponse, FilterChain filters) throws ServletException, IOException {

        try {
            String token = retrieveToken(servletRequest);
            if(token != null) {
                if(tokenUtilities.validateJwtToken(token)) {
                    String username = tokenUtilities.retrieveUserNameFromJWTToken(token);
                    UserDetails details = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(servletRequest));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception e) {
        }
        filters.doFilter(servletRequest, servletResponse);
    }
}
