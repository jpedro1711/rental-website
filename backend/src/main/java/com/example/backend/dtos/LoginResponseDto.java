package com.example.backend.dtos;

import java.util.UUID;

public record LoginResponseDto(String token, UUID id) {
}
