package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record MakeRecordDto(@NotBlank String name) {
}
