package com.example.backend.Controllers;

import com.example.backend.Entities.Reservation;
import com.example.backend.Entities.UserEntity;
import com.example.backend.Services.ReservationService;
import com.example.backend.Services.UserService;
import com.example.backend.dtos.ReservationDto;
import com.example.backend.dtos.UserDto;
import com.example.backend.dtos.UserResponseDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<UserEntity> saveUser(@RequestBody @Valid UserDto userDto) {
        return this.userService.create(userDto);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = this.userService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getOneUser(@PathVariable(value = "id") UUID id) {
        UserEntity user = this.userService.findOne(id);
        UserResponseDto res = new UserResponseDto(user);
        if (user != null) {
            return ResponseEntity.ok().body(res);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable(value = "id") UUID id, @RequestBody @Valid UserDto userDto) {
        UserEntity user = this.userService.update(id, userDto);
        if (user != null) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> removeUser(@PathVariable(value = "id") UUID id) {
        Boolean deleted = this.userService.remove(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
