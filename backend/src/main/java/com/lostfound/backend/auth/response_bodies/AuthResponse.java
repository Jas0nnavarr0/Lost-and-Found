package com.lostfound.backend.auth.response_bodies;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponse {
    private String message;

    public AuthResponse(String message) {
        this.message = message;
    }

}
