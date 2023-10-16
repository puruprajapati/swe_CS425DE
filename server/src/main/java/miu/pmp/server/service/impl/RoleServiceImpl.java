package miu.pmp.server.service.impl;

import miu.pmp.server.domain.Role;
import miu.pmp.server.repo.RoleRepo;
import miu.pmp.server.service.RoleService;
import org.springframework.stereotype.Service;

/**
 * The type Role service.
 */
@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepo roleRepo;

    /**
     * Instantiates a new Role service.
     *
     * @param roleRepo the role repo
     */
    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role findByName(String name) {
        return roleRepo.findByRoleName(name);
    }
}
