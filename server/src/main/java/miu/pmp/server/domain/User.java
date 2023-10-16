package miu.pmp.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import miu.pmp.server.annotation.Gender;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

/**
 * The type User.
 */
@Entity
@Data
@Table(name="users")
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class User extends BaseEntity{
    @NotEmpty(message = "Email is required")
    @Email
    private String email;
    @NotEmpty(message = "First name is required")
    @Column(name="first_name")
    private String firstName;
    @NotEmpty(message = "Last name is required")
    @Column(name="last_name")
    private String lastName;

    @NotEmpty(message = "Password is required")
    @JsonIgnore
    private String password;

    private boolean active;

    @NotEmpty(message = "Gender is required")
    @Gender
    private String gender;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
