package com.example.backend.Controllers;

import com.example.backend.Entities.Category;
import com.example.backend.Entities.Make;
import com.example.backend.Services.CategoryService;
import com.example.backend.dtos.CategoryRecordDto;
import com.example.backend.dtos.MakeRecordDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @PostMapping("/categories")
    public ResponseEntity<Category> saveCategory(@RequestBody @Valid CategoryRecordDto categoryRecordDto) {
        return this.categoryService.create(categoryRecordDto);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = this.categoryService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Object> getOneCategory(@PathVariable(value = "id") UUID id) {
        Category category = this.categoryService.findOne(id);
        if (category != null) {
            return ResponseEntity.ok().body(category);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Object> updateCategoru(@PathVariable(value = "id") UUID id, @RequestBody @Valid CategoryRecordDto categoryRecordDto) {
        Category category = this.categoryService.update(id, categoryRecordDto);
        if (category != null) {
            return ResponseEntity.status(HttpStatus.OK).body(category);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Object> removeMake(@PathVariable(value = "id") UUID id) {
        Boolean deleted = this.categoryService.remove(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Category deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
    }
}
