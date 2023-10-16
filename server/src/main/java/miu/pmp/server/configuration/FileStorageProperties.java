package miu.pmp.server.configuration;

/**
 * The type File storage properties.
 */
public class FileStorageProperties {
    private String uploadDir;

    /**
     * Gets upload dir.
     *
     * @return the upload dir
     */
    public String getUploadDir() {
        return System.getProperty("user.dir") + "/static";
    }

    /**
     * Sets upload dir.
     *
     * @param uploadDir the upload dir
     */
    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

}
