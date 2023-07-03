package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ReservationRecordDto(@NotNull LocalDate startDate, @NotNull LocalDate endDate) {
}
