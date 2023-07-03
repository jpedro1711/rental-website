package com.example.backend.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ReservationDto(@NotNull LocalDate startDate, @NotNull LocalDate endDate) {
}
