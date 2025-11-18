package com.lostfound.backend.exception_handling;

import com.lostfound.backend.dtos.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CentralExceptionCatcher {

    // Recommended to throw when a row is unable to be found in a table (Example: through findBy queries)
    @ExceptionHandler(EntryNotFoundException.class)
    public ResponseEntity<ApiResponse> entryNotFoundException(EntryNotFoundException e) {
        String body = e.getMessage();
        ApiResponse apiResponse = new ApiResponse(body, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    // Called when validations fail at the controller level
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    //  Recommended to throw when encountering a business logic error (Example: post not found through keyword "calculator")
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse> ApiException(ApiException e) {
        String body = e.getMessage();
        ApiResponse apiResponse = new ApiResponse(body, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    // When users select more than 3 categories, show this msg
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

}
