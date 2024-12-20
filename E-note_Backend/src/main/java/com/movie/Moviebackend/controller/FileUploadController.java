package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.movie.Moviebackend.model.FileUpload;
import com.movie.Moviebackend.repository.FileUploadRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private FileUploadRepository fileUploadRepository;

    private final Path fileStorageLocation = Paths.get("uploaded-files").toAbsolutePath().normalize();

    public FileUploadController() {
        try {
            Files.createDirectories(fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<FileUpload>> getAllFileUploads() {
        try {
            List<FileUpload> files = fileUploadRepository.findAll();
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("registerNumber") String registerNumber,
            @RequestParam("image") MultipartFile image,
            @RequestParam("pdf") MultipartFile pdf,
            @RequestParam("description") String description) {

        try {
            if (image.isEmpty() || pdf.isEmpty()) {
                return ResponseEntity.badRequest().body("Image or PDF file is missing!");
            }

            String imageFileName = StringUtils.cleanPath(image.getOriginalFilename());
            String pdfFileName = StringUtils.cleanPath(pdf.getOriginalFilename());

            Path imagePath = fileStorageLocation.resolve(imageFileName);
            Path pdfPath = fileStorageLocation.resolve(pdfFileName);

            Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            Files.copy(pdf.getInputStream(), pdfPath, StandardCopyOption.REPLACE_EXISTING);

            FileUpload fileUpload = new FileUpload();
            fileUpload.setRegisterNumber(registerNumber);
            fileUpload.setImageFileName(imageFileName);
            fileUpload.setPdfFileName(pdfFileName);
            fileUpload.setDescription(description);

            fileUploadRepository.save(fileUpload);

            return ResponseEntity.ok("File upload successful!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed due to: " + e.getMessage());
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // Default content type
            }

            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFileUploads(@PathVariable Long id) {
    	try {
    	// Fetch the file entry from the database using the ID
    	FileUpload fileUpload = fileUploadRepository.findById(id)
    	.orElse(null); // Use Optional to handle the absence of the entity
    	if (fileUpload == null) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No files found for this ID.");
    	}
    	// Define paths for image and PDF files
    	Path imagePath = fileStorageLocation.resolve(fileUpload.getImageFileName());
    	Path pdfPath = fileStorageLocation.resolve(fileUpload.getPdfFileName());
    	// Delete the files from the file system
    	Files.deleteIfExists(imagePath);
    	Files.deleteIfExists(pdfPath);
    	// Remove the file entry from the database
    	fileUploadRepository.delete(fileUpload);
    	return ResponseEntity.ok("Files deleted successfully.");
    	} catch (IOException e) {
    	e.printStackTrace();
    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting files.");
    	}
    }


}
