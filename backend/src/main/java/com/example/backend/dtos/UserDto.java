package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record UserDto(@NotBlank String name, @NotBlank String email, @NotBlank String cpf, @NotBlank String password, @NotBlank String driverLicenseNumber) {
}
