package com.example.backend.Services;

import com.example.backend.Entities.Category;
import com.example.backend.Repositories.CategoryRepository;
import com.example.backend.dtos.CategoryDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findOne(UUID id) {
        Optional<Category> category0 = repository.findById(id);
        if (category0.isEmpty()) {
            return null;
        }
        return category0.get();
    }

    public ResponseEntity<Category> create(CategoryDto data){
        var categoryModel = new Category();
        BeanUtils.copyProperties(data, categoryModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(categoryModel));
    }

    public Category update(UUID id, CategoryDto data) {
        Optional<Category> category0 = repository.findById(id);
        if (category0.isEmpty()) {
            return null;
        }
        var categoryModel = category0.get();
        BeanUtils.copyProperties(data, categoryModel);
        return repository.save(categoryModel);
    }

    public boolean remove(UUID id) {
        Optional<Category> category0 = repository.findById(id);
        if (category0.isEmpty()) {
            return false;
        }
        repository.delete(category0.get());
        return true;
    }
}
