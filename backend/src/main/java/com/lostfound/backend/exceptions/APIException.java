package com.lostfound.backend.exceptions;

//  Recommended to throw when encountering a business logic error (Example: post not found through keyword "calculator")
public class APIException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public APIException() {
    }

    public APIException(String message) {
        super(message);
    }
}
