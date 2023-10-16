package miu.pmp.server.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * The type Response message.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseMessage {
    private String message;
    private HttpStatus status;

    private Object data;

    /**
     * Instantiates a new Response message.
     *
     * @param message the message
     */
    public ResponseMessage(String message) {
        this.message = message;
    }

    /**
     * Instantiates a new Response message.
     *
     * @param message the message
     * @param status  the status
     */
    public ResponseMessage(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
