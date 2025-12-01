package com.lostfound.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostDeleteResponseDTO {
    private Long id;
    private String message;
}
