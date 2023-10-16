package miu.pmp.server.controller;

import miu.pmp.server.dto.*;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.security.service.impl.AuthServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * The type Auth controller.
 */
@RestController
@RequestMapping("api/auth")
@CrossOrigin
public class AuthController {
    private final AuthServiceImpl authService;

    /**
     * Instantiates a new Auth controller.
     *
     * @param authService the auth service
     */
    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    /**
     * Register user response message.
     *
     * @param userDTO the user dto
     * @return the response message
     */
    @PostMapping("register")
    public ResponseMessage registerUser(@RequestBody UserDTO userDTO){
        return authService.registerUser(userDTO);
    }

    /**
     * Login response message.
     *
     * @param loginDTO the login dto
     * @return the response message
     */
    @PostMapping("login")
    public ResponseMessage login(@RequestBody LoginDTO loginDTO) {
        return authService.login(loginDTO);
    }

    /**
     * Update response message.
     *
     * @param id            the id
     * @param updateUserDTO the update user dto
     * @return the response message
     */
    @PostMapping("update/{id}")
    public ResponseMessage update(@PathVariable UUID id, @RequestBody UpdateUserDTO updateUserDTO) {
        return authService.updateUser(id, updateUserDTO);
    }

    /**
     * Reset response message.
     *
     * @param id               the id
     * @param resetPasswordDTO the reset password dto
     * @return the response message
     */
    @PostMapping("reset")
    public ResponseMessage reset(@PathVariable UUID id, @RequestBody ResetPasswordDTO resetPasswordDTO) {
        return authService.resetPassword(id,resetPasswordDTO );
    }

    /**
     * Reset password by user response message.
     *
     * @param resetPasswordByUserDTO the reset password by user dto
     * @return the response message
     */
    @PostMapping("reset-password-by-user")
    public ResponseMessage resetPasswordByUser(@RequestBody ResetPasswordByUserDTO resetPasswordByUserDTO) {
        return authService.resetPasswordByUser(resetPasswordByUserDTO.getEmail() );
    }

    /**
     * Create new password response message.
     *
     * @param createNewPasswordDTO the create new password dto
     * @return the response message
     */
    @PostMapping("create-new-password")
    public ResponseMessage createNewPassword(@RequestBody CreateNewPasswordDTO createNewPasswordDTO) {
        return authService.createNewPassword(createNewPasswordDTO );
    }

}
