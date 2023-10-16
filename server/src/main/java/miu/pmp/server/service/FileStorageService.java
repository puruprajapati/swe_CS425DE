package miu.pmp.server.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * The interface File storage service.
 */
public interface FileStorageService {
    /**
     * Store file string.
     *
     * @param file the file
     * @return the string
     */
    String storeFile(MultipartFile file);
}
