package com.example.backend.Repositories;

import com.example.backend.Entities.Make;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MakeRepository extends JpaRepository<Make, UUID> {
}
