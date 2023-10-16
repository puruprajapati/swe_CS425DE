package miu.pmp.server.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miu.pmp.server.domain.User;
import org.keycloak.representations.AccessTokenResponse;

/**
 * The type Token with user dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenWithUserDTO {
    /**
     * The User.
     */
    public User user;
    /**
     * The Token response.
     */
    public AccessTokenResponse tokenResponse;
}
