package com.server.HotelServer.repository;

import com.server.HotelServer.model.User;
import com.server.HotelServer.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);

    List<User> findByUserRole(UserRole role);
}