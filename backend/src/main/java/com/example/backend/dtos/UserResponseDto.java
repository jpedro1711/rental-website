package com.example.backend.dtos;

import com.example.backend.Entities.Reservation;
import com.example.backend.Entities.UserEntity;
import com.example.backend.Enums.UserRole;

import java.util.Set;
import java.util.UUID;

public class UserResponseDto {
    private UUID userId;
    private String email;
    private Set<Reservation> reservations;
    private UserRole roles;

    public UserResponseDto(){}

    public UserResponseDto(UserEntity u) {
        this.userId = u.getUserId();
        this.email = u.getEmail();
        this.reservations = u.getReservations();
        this.roles = u.getRole();
    }

    public UUID getUserId() {
        return userId;
    }

    public UserRole getRoles() {
        return roles;
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

    public Set<Reservation> getReservations() {
        return reservations;
    }
}
