package com.lostfound.backend.Services;

import com.lostfound.backend.model.Category;
import com.lostfound.backend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> searchCategories(String categoryName){
        if(categoryName == null || categoryName.isBlank()) return categoryRepository.findAll();
        return categoryRepository.findByCategoryNameContainingIgnoreCase(categoryName);
    }

}
