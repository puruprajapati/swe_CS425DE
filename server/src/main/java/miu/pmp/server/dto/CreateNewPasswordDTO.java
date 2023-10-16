package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Create new password dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateNewPasswordDTO {
    private String password;
    private String token;
}
