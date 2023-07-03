package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record MakeDto(@NotBlank String name) {
}
