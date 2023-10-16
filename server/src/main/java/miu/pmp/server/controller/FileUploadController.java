package miu.pmp.server.controller;

import miu.pmp.server.dto.UploadFileResponseDTO;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * The type File upload controller.
 */
@RestController
@RequestMapping("/api/file")
@CrossOrigin
public class FileUploadController {

    private static final Logger log = LoggerFactory.getLogger(FileUploadController.class);

    private final FileStorageService fileStorageService;


    /**
     * Instantiates a new File upload controller.
     *
     * @param fileStorageService the file storage service
     */
    public FileUploadController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    /**
     * Upload file response entity.
     *
     * @param file the file
     * @return the response entity
     */
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileDownloadUri = fileStorageService.storeFile(file);

        UploadFileResponseDTO response = new UploadFileResponseDTO(fileName, fileDownloadUri, file.getContentType(), file.getSize());

        return ResponseEntity.ok(new ResponseMessage("Success", HttpStatus.CREATED, response));
    }

    /**
     * Upload multiple files response entity.
     *
     * @param files the files
     * @return the response entity
     */
    @PostMapping("/upload-multiple-files")
    public ResponseEntity<ResponseMessage> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        var response = Arrays.asList(files)
                .stream()
                .map(file -> {
                    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                    String fileDownloadUri = fileStorageService.storeFile(file);
                    UploadFileResponseDTO fileResponse = new UploadFileResponseDTO(fileName, fileDownloadUri, file.getContentType(), file.getSize());
                    return fileResponse;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ResponseMessage("Success", HttpStatus.CREATED, response));
    }
}
