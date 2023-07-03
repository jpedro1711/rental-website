package com.example.backend.Services;


import com.example.backend.Entities.Car;
import com.example.backend.Entities.Make;
import com.example.backend.Repositories.MakeRepository;
import com.example.backend.dtos.CarRecordDto;
import com.example.backend.dtos.MakeRecordDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class MakeService {
    @Autowired
    private MakeRepository repository;

    public List<Make> findAll() {
        return repository.findAll();
    }

    public Make findOne(UUID id) {
        Optional<Make> make0 = repository.findById(id);
        if (make0.isEmpty()) {
            return null;
        }
        return make0.get();
    }

    public ResponseEntity<Make> create(MakeRecordDto data){
        var makeModel = new Make();
        BeanUtils.copyProperties(data, makeModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(makeModel));
    }

    public Make update(UUID id, MakeRecordDto data) {
        Optional<Make> make0 = repository.findById(id);
        if (make0.isEmpty()) {
            return null;
        }
        var makeModel = make0.get();
        BeanUtils.copyProperties(data, makeModel);
        return repository.save(makeModel);
    }

    public boolean remove(UUID id) {
        Optional<Make> make0 = repository.findById(id);
        if (make0.isEmpty()) {
            return false;
        }
        repository.delete(make0.get());
        return true;
    }
}
