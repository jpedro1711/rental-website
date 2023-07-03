package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record CategoryRecordDto(@NotBlank String name) {
}
