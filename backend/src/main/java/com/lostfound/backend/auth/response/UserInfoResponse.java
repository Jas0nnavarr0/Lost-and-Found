package com.lostfound.backend.auth.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserInfoResponse {
    private String username;
    private List<String> roles;
    private Long id;
    private String jwtToken;

    public UserInfoResponse(Long id, String username, List<String> roles, String token) {
        this.id = id;
        this.jwtToken = token;
        this.username = username;
        this.roles = roles;
    }

    public UserInfoResponse(Long id, String username, List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}
