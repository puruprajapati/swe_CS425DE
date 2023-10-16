package miu.pmp.server.service;

import miu.pmp.server.domain.Role;

/**
 * The interface Role service.
 */
public interface RoleService {
    /**
     * Find by name role.
     *
     * @param name the name
     * @return the role
     */
    Role findByName(String name);
}
