package com.movie.Moviebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.movie.Moviebackend.model.Student;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
 Optional<Student> findByRegisterNumber(String registerNumber);
}
