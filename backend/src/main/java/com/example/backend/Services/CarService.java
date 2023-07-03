package com.example.backend.Services;

import com.example.backend.Entities.Car;
import com.example.backend.Repositories.CarRepository;
import com.example.backend.dtos.CarRecordDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class CarService {
    @Autowired
    private CarRepository repository;

    public List<Car> findAll() {
        return repository.findAll();
    }

    public Car findOne(UUID id) {
        Optional<Car> car0 = repository.findById(id);
        if (car0.isEmpty()) {
            return null;
        }
        return car0.get();
    }

    public ResponseEntity<Car> create(CarRecordDto data){
        var carModel = new Car();
        BeanUtils.copyProperties(data, carModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(carModel));
    }

    public Car update(UUID id, CarRecordDto data) {
        Optional<Car> car0 = repository.findById(id);
        if (car0.isEmpty()) {
            return null;
        }
        var carModel = car0.get();
        BeanUtils.copyProperties(data, carModel);
        return repository.save(carModel);
    }

    public boolean remove(UUID id) {
        Optional<Car> car0 = repository.findById(id);
        if (car0.isEmpty()) {
            return false;
        }
        repository.delete(car0.get());
        return true;
    }
}
