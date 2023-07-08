package com.example.backend.Services;
import com.example.backend.Entities.UserEntity;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.dtos.UserDto;
import com.example.backend.dtos.UserResponseDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;


    public List<UserResponseDto> findAll() {
        List<UserEntity> users =  repository.findAll();
        List<UserResponseDto> usersDto = users.stream().map(x -> new UserResponseDto(x)).collect(Collectors.toList());
        return usersDto;
    }

    public UserEntity findOne(UUID id) {
        Optional<UserEntity> user0 = repository.findById(id);
        if (user0.isEmpty()) {
            return null;
        }
        return user0.get();
    }

    public UserEntity findByEmail(String email) {
        UserEntity user0 = (UserEntity) repository.findByEmail(email);
        return user0;
    }

    public ResponseEntity<UserEntity> create(UserDto data){
        var userModel = new UserEntity();
        BeanUtils.copyProperties(data, userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(userModel));
    }

    public UserEntity update(UUID id, UserDto data) {
        Optional<UserEntity> user0 = repository.findById(id);
        if (user0.isEmpty()) {
            return null;
        }
        var userModel = user0.get();
        BeanUtils.copyProperties(data, user0);
        return repository.save(userModel);
    }

    public boolean remove(UUID id) {
        Optional<UserEntity> user0 = repository.findById(id);
        if (user0.isEmpty()) {
            return false;
        }
        repository.delete(user0.get());
        return true;
    }
}
