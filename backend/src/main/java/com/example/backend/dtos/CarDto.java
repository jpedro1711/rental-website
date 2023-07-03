package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CarDto(
        @NotBlank String model,
        @NotNull Integer year,
        @NotBlank String imageUrl,
        @NotNull double mileage,
        @NotBlank String licensePlate,
        @NotNull double pricePerDay,
        @NotNull UUID categoryId,

        @NotNull UUID makeId
        ) {
}
