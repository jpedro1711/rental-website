package com.example.backend.Controllers;

import com.example.backend.Entities.Car;
import com.example.backend.Services.CarService;
import com.example.backend.dtos.CarDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping("/cars")
    public ResponseEntity<Car> saveCar(@RequestBody @Valid CarDto carDto) {
        return this.carService.create(carDto);
    }

    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = this.carService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(cars);
    }

    @GetMapping("/cars/{id}")
    public ResponseEntity<Object> getOneCar(@PathVariable(value = "id") UUID id) {
        Car car = this.carService.findOne(id);
        if (car != null) {
            return ResponseEntity.ok().body(car);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity<Object> updateCar(@PathVariable(value = "id") UUID id, @RequestBody @Valid CarDto carDto) {
        Car car = this.carService.update(id, carDto);
        if (car != null) {
            return ResponseEntity.status(HttpStatus.OK).body(car);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
    }

    @DeleteMapping("/cars/{id}")
    public ResponseEntity<Object> removeCar(@PathVariable(value = "id") UUID id) {
        Boolean deleted = this.carService.remove(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Car deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
    }
}
