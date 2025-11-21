package com.lostfound.backend.repositories;

import com.lostfound.backend.model.EnumRole;
import com.lostfound.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmail(String email);

    @Query("""
        SELECT u FROM User u WHERE EXISTS (SELECT 1 FROM u.roles r1 WHERE r1.roleName = 'ROLE_USER')
            AND NOT EXISTS (
                SELECT 1 FROM u.roles r2 WHERE r2.roleName IN ('ROLE_MODERATOR', 'ROLE_ADMIN')
            )
    """)
    List<User> findRegularUsers();

    @Query("""
        SELECT u FROM User u
        WHERE EXISTS (SELECT 1 FROM u.roles r1 WHERE r1.roleName = 'ROLE_MODERATOR')
            AND NOT EXISTS (SELECT 1 FROM u.roles r2 WHERE r2.roleName = 'ROLE_ADMIN')
    """)
    List<User> findModeratorsOnly();
}
