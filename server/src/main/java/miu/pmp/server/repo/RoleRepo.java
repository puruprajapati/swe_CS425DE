package miu.pmp.server.repo;

import miu.pmp.server.domain.Role;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * The interface Role repo.
 */
@Repository
public interface RoleRepo extends PagingAndSortingRepository<Role, UUID> {
    /**
     * Find by role name role.
     *
     * @param name the name
     * @return the role
     */
    Role findByRoleName(@Param("roleName") String name);
}
