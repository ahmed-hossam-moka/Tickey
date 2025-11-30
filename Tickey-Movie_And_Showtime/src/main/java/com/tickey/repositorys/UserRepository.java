package com.tickey.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;


import com.tickey.entites.User;
import com.tickey.entites.enums.UserRole;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(UserRole role);
    boolean existsByEmail(String email);
}