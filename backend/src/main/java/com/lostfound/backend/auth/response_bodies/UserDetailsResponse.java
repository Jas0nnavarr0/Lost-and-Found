package com.lostfound.backend.auth.response_bodies;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserDetailsResponse {
    private String username;
    private List<String> roles;
    private Long id;
    private String token;

    public UserDetailsResponse(Long id, String username, List<String> authorities, String token) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.roles = authorities;
    }

    public UserDetailsResponse(Long id, String username, List<String> authorities) {
        this.id = id;
        this.username = username;
        this.roles = authorities;
    }
}
