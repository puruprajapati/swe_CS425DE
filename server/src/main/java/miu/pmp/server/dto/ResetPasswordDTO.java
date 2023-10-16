package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Reset password dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordDTO {
    private String password;
}
