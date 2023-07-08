package com.example.backend.Controllers;

import com.example.backend.Entities.UserEntity;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.dtos.AuthenticationDto;
import com.example.backend.dtos.LoginResponseDto;
import com.example.backend.dtos.RegisterDto;
import com.example.backend.dtos.UserResponseDto;
import com.example.backend.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UserEntity) auth.getPrincipal());


        return ResponseEntity.ok(new LoginResponseDto(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDto data) {
        if (this.repository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        UserEntity newUser = new UserEntity(data.email(), encryptedPassword, data.role(), data.name(), data.cpf(), data.driverLicenseNumber());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    public ResponseEntity getUserWithToken(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        var tokenvalidated = tokenService.validateToken(token);
        if (tokenvalidated == "") {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserResponseDto userData = tokenService.extractUserData(token);
        return ResponseEntity.status(HttpStatus.OK).body(userData);
    }
}
