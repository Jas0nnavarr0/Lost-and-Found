package com.lostfound.backend.repositories;

import com.lostfound.backend.model.AppRole;
import com.lostfound.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole appRole);
}
