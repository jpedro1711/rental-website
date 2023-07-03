package com.example.backend.Controllers;

import com.example.backend.Entities.Car;
import com.example.backend.Entities.Make;
import com.example.backend.Services.MakeService;
import com.example.backend.dtos.CarRecordDto;
import com.example.backend.dtos.MakeRecordDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class MakeController {
    @Autowired
    private MakeService makeService;

    @PostMapping("/makes")
    public ResponseEntity<Make> saveMake(@RequestBody @Valid MakeRecordDto makeRecordDto) {
        return this.makeService.create(makeRecordDto);
    }

    @GetMapping("/makes")
    public ResponseEntity<List<Make>> getAllMakes() {
        List<Make> makes = this.makeService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(makes);
    }

    @GetMapping("/makes/{id}")
    public ResponseEntity<Object> getOneMake(@PathVariable(value = "id") UUID id) {
        Make make = this.makeService.findOne(id);
        if (make != null) {
            return ResponseEntity.ok().body(make);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Make not found");
    }

    @PutMapping("/makes/{id}")
    public ResponseEntity<Object> updateMake(@PathVariable(value = "id") UUID id, @RequestBody @Valid MakeRecordDto makeRecordDto) {
        Make make = this.makeService.update(id, makeRecordDto);
        if (make != null) {
            return ResponseEntity.status(HttpStatus.OK).body(make);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Make not found");
    }

    @DeleteMapping("/makes/{id}")
    public ResponseEntity<Object> removeMake(@PathVariable(value = "id") UUID id) {
        Boolean deleted = this.makeService.remove(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Make deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Make not found");
    }
}
