package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Reset password by user dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordByUserDTO {
    private String email;
}
