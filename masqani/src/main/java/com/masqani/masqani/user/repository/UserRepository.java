package com.masqani.masqani.user.repository;

import com.masqani.masqani.user.enums.Role;
import com.masqani.masqani.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    @Query("select u from User u where u.role = :role")
    List<User> findByRole(@Param("role") Role role);
    User findByVerificationToken(String token);
    @Query("select u from User u where u.publicId = :publicId")
    User findByPublicId(@Param("publicId") String publicId);}