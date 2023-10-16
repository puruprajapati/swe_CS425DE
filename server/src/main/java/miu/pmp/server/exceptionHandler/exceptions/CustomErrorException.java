package miu.pmp.server.exceptionHandler.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

/**
 * The type Custom error exception.
 */
@Data
public class CustomErrorException extends RuntimeException {
    private HttpStatus status = null;

    private Object data = null;

    /**
     * Instantiates a new Custom error exception.
     */
    public CustomErrorException() {
        super();
    }

    /**
     * Instantiates a new Custom error exception.
     *
     * @param message the message
     */
    public CustomErrorException(
            String message
    ) {
        super(message);
    }

    /**
     * Instantiates a new Custom error exception.
     *
     * @param status  the status
     * @param message the message
     */
    public CustomErrorException(
            HttpStatus status,
            String message
    ) {
        this(message);
        this.status = status;
    }

    /**
     * Instantiates a new Custom error exception.
     *
     * @param status  the status
     * @param message the message
     * @param data    the data
     */
    public CustomErrorException(
            HttpStatus status,
            String message,
            Object data
    ) {
        this(
                status,
                message
        );
        this.data = data;
    }
}
