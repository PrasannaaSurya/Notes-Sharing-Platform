package com.movie.Moviebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.movie.Moviebackend.model.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> 
{
	User findByUserID(String userID);
}
