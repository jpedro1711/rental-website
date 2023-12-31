package com.example.backend.Services;

import com.example.backend.Entities.Car;
import com.example.backend.Entities.Category;
import com.example.backend.Entities.Make;
import com.example.backend.Repositories.CarRepository;
import com.example.backend.dtos.CarDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CarService {
    @Autowired
    private CarRepository repository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private MakeService makeService;

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

    public List<Car> findByName(String name) {
        List<Car> cars = repository.findAll();
        List<Car> result = new ArrayList<>();
        for (Car c: cars) {
            if (c.getModel().equals(name)) {
                result.add(c);
            }
        }
        return result;
    }

    public ResponseEntity create(CarDto data){
        List<Car> cars = this.findAll();
        for (Car c: cars) {
            if (c.getLicensePlate().equals(data.licensePlate())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This car already exists");
            }
        }
        var carModel = new Car();
        BeanUtils.copyProperties(data, carModel);
        Category c = categoryService.findOne(data.categoryId());
        Make m = makeService.findOne(data.makeId());
        if (c == null || m == null) {
            return null;
        }
        carModel.setCategory(c);
        carModel.setMake(m);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(carModel));
    }

    public Car update(UUID id, CarDto data) {
        Optional<Car> car0 = repository.findById(id);
        if (car0.isEmpty()) {
            return null;
        }
        var carModel = car0.get();
        BeanUtils.copyProperties(data, carModel);
        Category c = categoryService.findOne(data.categoryId());
        Make m = makeService.findOne(data.makeId());
        if (c == null || m == null) {
            return null;
        }
        carModel.setCategory(c);
        carModel.setMake(m);

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
