package miu.pmp.server.repo;

import miu.pmp.server.domain.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

/**
 * The interface Password reset token repo.
 */
public interface PasswordResetTokenRepo extends CrudRepository<PasswordResetToken, UUID> {
    /**
     * Find by token password reset token.
     *
     * @param token the token
     * @return the password reset token
     */
    PasswordResetToken findByToken(String token);
}
