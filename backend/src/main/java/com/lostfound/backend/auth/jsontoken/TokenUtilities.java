package com.lostfound.backend.auth.jsontoken;

import com.lostfound.backend.auth.custom_user_details.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class TokenUtilities {
    static Logger log = LoggerFactory.getLogger(TokenUtilities.class);

    @Value("${spring.backend.app.jwtCookieName}")
    private String jsonCookie;

    @Value("${spring.app.jwtSecret}")
    private String secret;

    @Value("${spring.app.jwtExpirationMs}")
    private String tokenExpiration;

    public Key decodeKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String retrieveTokenInCookies(HttpServletRequest servletRequest) {
        Cookie cookie = WebUtils.getCookie(servletRequest, jsonCookie);
        return cookie != null ? cookie.getValue() : null;
    }

    public String retrieveTokenInHeader(HttpServletRequest servletRequest) {
        String bearer = servletRequest.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }

    public ResponseCookie createJwtCookie(UserDetailsImpl userPrincipal) {
        String token = createTokenByUsername(userPrincipal.getUsername());
        ResponseCookie responseCookie = ResponseCookie.from(jsonCookie, token).path("/api").maxAge(18000)
                .httpOnly(false)
                .build();
        return responseCookie;
    }

    // Generating Token from Username
    public String createTokenByUsername(String username) {
        return Jwts.builder().subject(username).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpiration)))
                .signWith(decodeKey())
                .compact();
    }

    // Getting Username from JWT Token
    public String retrieveUserNameFromJWTToken(String jwtToken) {
        return Jwts.parser().verifyWith((SecretKey) decodeKey())
                .build().parseSignedClaims(jwtToken)
                .getPayload().getSubject();
    }
    public ResponseCookie retrieveClearedCookie() {
        ResponseCookie cookie = ResponseCookie.from(jsonCookie, null).path("/api").build();
        return cookie;
    }

    public boolean validateJwtToken(String jwtToken) {
        try {
            Jwts.parser().verifyWith((SecretKey) decodeKey()).build().parseSignedClaims(jwtToken);
            return true;
        } catch (MalformedJwtException e) {
            log.error("Incorrect: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("Token expired: {}", e.getMessage());
        }
        return false;
    }


}
