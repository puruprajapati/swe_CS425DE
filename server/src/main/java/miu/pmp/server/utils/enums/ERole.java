package miu.pmp.server.utils.enums;

/**
 * The enum E role.
 */
public enum ERole {
    /**
     * Role admin e role.
     */
    ROLE_ADMIN("ROLE_ADMIN"),
    /**
     * Role tenant e role.
     */
    ROLE_TENANT("ROLE_TENANT"),
    /**
     * Role landlord e role.
     */
    ROLE_LANDLORD("ROLE_LANDLORD"),
    ;

    private String role;

    ERole(String role) {
        this.role = role;
    }

    /**
     * Gets role.
     *
     * @return the role
     */
    public String getRole() {
        return role;
    }
}
