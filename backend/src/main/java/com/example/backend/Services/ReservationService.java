package com.example.backend.Services;

import com.example.backend.Entities.Make;
import com.example.backend.Entities.Reservation;
import com.example.backend.Repositories.ReservationRepository;
import com.example.backend.dtos.ReservationDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class ReservationService {
    @Autowired
    private ReservationRepository repository;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(reservationModel));
    }

    public Reservation update(UUID id, ReservationDto data) {
        Optional<Reservation> reservation0 = repository.findById(id);
        if (reservation0.isEmpty()) {
            return null;
        }
        var reservationModel = reservation0.get();
        BeanUtils.copyProperties(data, reservation0);
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
