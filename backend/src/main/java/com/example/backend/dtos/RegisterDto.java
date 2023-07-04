package com.example.backend.dtos;

import com.example.backend.Enums.UserRole;

public record RegisterDto(String email, String password, UserRole role, String name, String cpf, String driverLicenseNumber) {
}
