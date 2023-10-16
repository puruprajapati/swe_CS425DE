package miu.pmp.server.service;

import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.domain.Role;
import miu.pmp.server.domain.User;
import miu.pmp.server.dto.common.PagingRequest;
import miu.pmp.server.dto.common.ResponseMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

/**
 * The interface User service.
 */
public interface UserService {
    /**
     * Save user response message.
     *
     * @param u the u
     * @return the response message
     */
    ResponseMessage saveUser(User u);

    /**
     * Gets user by id.
     *
     * @param id the id
     * @return the user by id
     */
    ResponseMessage getUserById(UUID id);

    /**
     * Gets all user.
     *
     * @return the all user
     */
    ResponseMessage getAllUser();

    /**
     * Gets all user paginated.
     *
     * @param pagingRequest the paging request
     * @return the all user paginated
     */
    Page<User> getAllUserPaginated(PagingRequest pagingRequest);

    /**
     * Gets all user by role.
     *
     * @param pageable the pageable
     * @param role     the role
     * @return the all user by role
     */
    Page<User> getAllUserByRole(Pageable pageable, Role role);

    /**
     * Gets all by role id and keywords.
     *
     * @param pageable the pageable
     * @param role     the role
     * @param keywords the keywords
     * @return the all by role id and keywords
     */
    Page<User> getAllByRoleIdAndKeywords(Pageable pageable, Role role, String keywords);

    /**
     * Gets rental.
     *
     * @return the rental
     */
    List<PropertyRentalHistory> getRental();

    /**
     * Gets rental of owner.
     *
     * @return the rental of owner
     */
    List<PropertyRentalHistory> getRentalOfOwner();
}
