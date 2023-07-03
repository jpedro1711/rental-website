package com.example.backend.Controllers;

import com.example.backend.Entities.Reservation;
import com.example.backend.Services.ReservationService;
import com.example.backend.dtos.ReservationDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> saveReservation(@RequestBody @Valid ReservationDto reservationRecordDto) {
        return this.reservationService.create(reservationRecordDto);
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = this.reservationService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(reservations);
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<Object> getOneReservation(@PathVariable(value = "id") UUID id) {
        Reservation reservation = this.reservationService.findOne(id);
        if (reservation != null) {
            return ResponseEntity.ok().body(reservation);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<Object> updateMake(@PathVariable(value = "id") UUID id, @RequestBody @Valid ReservationDto reservationRecordDto) {
        Reservation reservation = this.reservationService.update(id, reservationRecordDto);
        if (reservation != null) {
            return ResponseEntity.status(HttpStatus.OK).body(reservation);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<Object> removeMake(@PathVariable(value = "id") UUID id) {
        Boolean deleted = this.reservationService.remove(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Reservation deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
    }
}
