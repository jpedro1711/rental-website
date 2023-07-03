package com.example.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "TB_MAKE")
public class Make implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID makeId;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "make", cascade = CascadeType.ALL)
    private Set<Car> cars = new HashSet<>();

    public Set<Car> getCars() {
        return cars;
    }

    public UUID getMakeId() {
        return makeId;
    }

    public void setMakeId(UUID makeId) {
        this.makeId = makeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
