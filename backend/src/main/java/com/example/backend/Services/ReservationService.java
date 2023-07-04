package com.example.backend.Services;

import com.example.backend.Entities.Car;
import com.example.backend.Entities.Make;
import com.example.backend.Entities.Reservation;
import com.example.backend.Entities.UserEntity;
import com.example.backend.Repositories.CarRepository;
import com.example.backend.Repositories.ReservationRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.dtos.ReservationDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository repository;

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;

    public List<Reservation> findAll() {
        return repository.findAll();
    }

    public Reservation findOne(UUID id) {
        Optional<Reservation> reservation0 = repository.findById(id);
        if (reservation0.isEmpty()) {
            return null;
        }
        return reservation0.get();
    }

    public ResponseEntity<Reservation> create(ReservationDto data){
        var reservationModel = new Reservation();
        BeanUtils.copyProperties(data, reservationModel);
        UserEntity u = userService.findOne(data.userId());
        Car c = carService.findOne(data.carId());
        if (u == null || c == null) {
            return null;
        }
        reservationModel.setCar(c);
        reservationModel.setUser(u);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(reservationModel));
    }

    public Reservation update(UUID id, ReservationDto data) {
        Optional<Reservation> reservation0 = repository.findById(id);
        if (reservation0.isEmpty()) {
            return null;
        }
        var reservationModel = reservation0.get();
        BeanUtils.copyProperties(data, reservation0);
        UserEntity u = userService.findOne(data.userId());
        Car c = carService.findOne(data.carId());
        if (u == null || c == null) {
            return null;
        }
        reservationModel.setCar(c);
        reservationModel.setUser(u);
        return repository.save(reservationModel);
    }

    public boolean remove(UUID id) {
        Optional<Reservation> reservation0 = repository.findById(id);
        if (reservation0.isEmpty()) {
            return false;
        }
        repository.delete(reservation0.get());
        return true;
    }
}
