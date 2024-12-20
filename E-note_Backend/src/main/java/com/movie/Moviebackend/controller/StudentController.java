package com.movie.Moviebackend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movie.Moviebackend.model.Student;
import com.movie.Moviebackend.repository.StudentRepository;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/students")
public class StudentController {

 @Autowired
 private StudentRepository studentRepository;

 @PostMapping("/register")
 public ResponseEntity<String> registerStudent(@Valid @RequestBody Student student) {
     if (studentRepository.findByRegisterNumber(student.getRegisterNumber()).isPresent()) {
         return ResponseEntity.badRequest().body("Registration number already exists");
     }
     studentRepository.save(student);
     return ResponseEntity.ok("Student registered successfully");
 }

 @PostMapping("/login")
 public ResponseEntity<String> loginStudent(@RequestParam String registerNumber, @RequestParam String password) {
     Optional<Student> student = studentRepository.findByRegisterNumber(registerNumber);
     if (student.isPresent() && student.get().getPassword().equals(password)) {
         return ResponseEntity.ok("Login successful");
     } else {
         return ResponseEntity.badRequest().body("Invalid registration number or password");
     }
 }
 
 @GetMapping
 public ResponseEntity<List<Student>> getAllStudents() {
     List<Student> students = studentRepository.findAll();
     if (students.isEmpty()) {
         return ResponseEntity.noContent().build();
     } else {
         return ResponseEntity.ok(students);
     }
 }
//Add this method in your StudentController class
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
  Optional<Student> student = studentRepository.findById(id);
  if (!student.isPresent()) {
      return ResponseEntity.notFound().build();
  }
  studentRepository.deleteById(id);
  return ResponseEntity.ok("Student deleted successfully");
}

@PutMapping("/{id}")
public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
    Optional<Student> studentOptional = studentRepository.findById(id);

    if (!studentOptional.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    Student existingStudent = studentOptional.get();
    existingStudent.setName(updatedStudent.getName());
    existingStudent.setPassword(updatedStudent.getPassword());
    existingStudent.setPhoneNumber(updatedStudent.getPhoneNumber());
    // Set other fields as needed
    studentRepository.save(existingStudent);

    return ResponseEntity.ok("Student updated successfully");
}
}