package com.lostfound.backend.repositories;

import com.lostfound.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JpaRepository defines how the methods should work automatically
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
