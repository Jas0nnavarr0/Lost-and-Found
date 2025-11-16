package com.lostfound.backend.repositories;

import com.lostfound.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository <Category, Integer> {
    // JPA query method
    // automatically generate a query
    // no to write need sql myself
    // matches the field name is the category entity
    // containing -> means LIKE %Something% in the SQL
    // case-insensitive
    List<Category> findByCategoryNameContainingIgnoreCase(String categoryName);

    boolean existsByCategoryNameIgnoreCase(String categoryName);
}
