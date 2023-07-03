package com.example.backend.dtos;

import com.example.backend.Entities.UserEntity;

import java.util.UUID;

public class UserResponseDto {
    private UUID userId;
    private String email;

    public UserResponseDto(){}

    public UserResponseDto(UserEntity u) {
        this.userId = u.getUserId();
        this.email = u.getEmail();
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
