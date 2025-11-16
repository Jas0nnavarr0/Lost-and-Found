package com.lostfound.backend.config;

import com.lostfound.backend.model.Category;
import com.lostfound.backend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    /*
    public DataLoader(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    */

    // This is the method that executes right after Spring Boot starts.
    @Override
    public void run(String[] args) {
        List<String> defaultCategories = List.of(
                "Electronics",
                "Personal Items",
                "Bags",
                "Clothing",
                "Documents",
                "Jewelry",
                "Money / Cards",
                "Pets",
                "Accessories",
                "Wallet",
                "Key",
                "Books",
                "School Items",
                "Others"
        );


        // check if the new category exits in the DB already.
        for(String category : defaultCategories){
            boolean isExist = categoryRepository.existsByCategoryNameIgnoreCase(category);
            if(!isExist){
                categoryRepository.save(new Category(0, category));
                System.out.println("✅ Default categories added successfully!");
            }else{
                System.out.println("ℹ️ Categories already exist. Skipping default data load.");
            }
        }
    }
}
