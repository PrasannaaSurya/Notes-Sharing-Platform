package com.movie.Moviebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.Moviebackend.model.FileUpload;

public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {
	
}
