package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Login dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    /**
     * The Email.
     */
    public String email;
    /**
     * The Password.
     */
    public String password;
}
