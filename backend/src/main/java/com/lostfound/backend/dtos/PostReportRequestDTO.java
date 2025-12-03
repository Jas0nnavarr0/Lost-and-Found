package com.lostfound.backend.dtos;

import lombok.Data;

@Data
public class PostReportRequestDTO {
    private String reason;
    private String details;
}
