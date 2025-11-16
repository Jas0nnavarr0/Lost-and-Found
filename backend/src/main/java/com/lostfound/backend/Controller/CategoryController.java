package com.lostfound.backend.controller;

import com.lostfound.backend.services.CategoryService;
import com.lostfound.backend.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/search_categories")
    public List<Category> search(@RequestParam(required = false) String categoryName){
        return categoryService.searchCategories(categoryName);
    }
}
