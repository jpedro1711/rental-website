package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record ReservationDto(@NotNull LocalDate startDate,
                             @NotNull LocalDate endDate,
                             @NotNull double totalValue,
                             @NotNull UUID userId,
                             @NotNull UUID carId
) {
}
