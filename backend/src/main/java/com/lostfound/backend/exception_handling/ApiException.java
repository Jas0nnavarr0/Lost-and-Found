package com.lostfound.backend.exception_handling;

//  Recommended to throw when encountering a business logic error (Example: post not found through keyword "calculator")
public class ApiException extends RuntimeException {

    public ApiException() {
    }

    public ApiException(String message) {
        super(message);
    }
}
