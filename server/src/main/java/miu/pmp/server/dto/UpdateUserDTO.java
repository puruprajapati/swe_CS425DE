package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Update user dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDTO {
    private String firstName;
    private String lastName;
}
