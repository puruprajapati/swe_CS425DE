package miu.pmp.server.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * The type Password reset token.
 */
@Entity
@Data
@NoArgsConstructor
public class PasswordResetToken extends BaseEntity{
        private String token;
        @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
        @JoinColumn(nullable = false, name = "user_id")
        private User user;

        @Column(name = "is_valid")
        private boolean isValid = true;

        private LocalDateTime expiryDateTime;
}
