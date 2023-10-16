package miu.pmp.server.security.service;

import miu.pmp.server.dto.LoginDTO;
import miu.pmp.server.dto.common.ResponseMessage;

import java.util.UUID;

/**
 * The interface Auth service.
 */
public interface AuthService {
    /**
     * Login response message.
     *
     * @param loginDTO the login dto
     * @return the response message
     */
    ResponseMessage login(LoginDTO loginDTO);

    /**
     * Register user response message.
     *
     * @param userDTO the user dto
     * @return the response message
     */
    ResponseMessage registerUser(LoginDTO userDTO);

    /**
     * Activate user response message.
     *
     * @param id       the id
     * @param isActive the is active
     * @return the response message
     */
    ResponseMessage activateUser(UUID id, boolean isActive);
}
