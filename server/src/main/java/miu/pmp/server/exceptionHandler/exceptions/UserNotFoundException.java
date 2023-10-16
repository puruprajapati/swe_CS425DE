package miu.pmp.server.exceptionHandler.exceptions;

/**
 * The type User not found exception.
 */
public class UserNotFoundException extends RuntimeException {
    /**
     * Instantiates a new User not found exception.
     *
     * @param message the message
     */
    public UserNotFoundException(String message) {
        super(message);
    }
}
