package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record CategoryDto(@NotBlank String name) {
}
