package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Activate user dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivateUserDTO {
    private boolean active = true;
}
