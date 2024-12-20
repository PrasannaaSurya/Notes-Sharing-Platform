package com.movie.Moviebackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 @Column(unique = true, nullable = false)
 private String registerNumber;

 @Column(nullable = false)
 private String name;

 @Column(nullable = false)
 private String email;

 @Column(nullable = false)
 private String phoneNumber;

 public Student()
 {
	 
 }
 
 public Student(Long id, String registerNumber, String name, String email, String phoneNumber, String password) {
	super();
	this.id = id;
	this.registerNumber = registerNumber;
	this.name = name;
	this.email = email;
	this.phoneNumber = phoneNumber;
	this.password = password;
}

@Column(nullable = false)
 private String password;
 
 

 // Getters and Setters
 public Long getId() {
     return id;
 }

 public void setId(Long id) {
     this.id = id;
 }

 public String getRegisterNumber() {
     return registerNumber;
 }

 public void setRegisterNumber(String registerNumber) {
     this.registerNumber = registerNumber;
 }

 public String getName() {
     return name;
 }

 public void setName(String name) {
     this.name = name;
 }

 public String getEmail() {
     return email;
 }

 public void setEmail(String email) {
     this.email = email;
 }

 public String getPhoneNumber() {
     return phoneNumber;
 }

 public void setPhoneNumber(String phoneNumber) {
     this.phoneNumber = phoneNumber;
 }

 public String getPassword() {
     return password;
 }

 public void setPassword(String password) {
     this.password = password;
 }
}
