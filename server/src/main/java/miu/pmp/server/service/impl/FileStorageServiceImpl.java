package miu.pmp.server.service.impl;

import miu.pmp.server.configuration.FileStorageProperties;
import miu.pmp.server.exceptionHandler.exceptions.CustomErrorException;
import miu.pmp.server.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * The type File storage service.
 */
@Service
public class FileStorageServiceImpl implements FileStorageService {
    private final Path fileStorageLocation;

    /**
     * Instantiates a new File storage service.
     */
    @Autowired
    public FileStorageServiceImpl() {
        FileStorageProperties fileStorageProperties = new FileStorageProperties();
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new CustomErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not create the directory where the uploaded files will be stored." + ex.getMessage());
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new CustomErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/static/")
                    .path(fileName)
                    .toUriString();

            return fileDownloadUri;
        } catch (IOException ex) {
            throw new CustomErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not store file " + fileName + ". Please try again!", ex);
        }
    }
}
