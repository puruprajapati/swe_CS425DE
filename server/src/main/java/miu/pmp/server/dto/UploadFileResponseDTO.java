package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Upload file response dto.
 */
@Data
//@AllArgsConstructor
@NoArgsConstructor
public class UploadFileResponseDTO {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;

    /**
     * Instantiates a new Upload file response dto.
     *
     * @param fileName        the file name
     * @param fileDownloadUri the file download uri
     * @param fileType        the file type
     * @param size            the size
     */
    public UploadFileResponseDTO(String fileName, String fileDownloadUri, String fileType, long size) {
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }
}
