package miu.pmp.server.controller;

import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.domain.User;
import miu.pmp.server.dto.common.PagingRequest;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.service.impl.UserServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * The type User controller.
 */
@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UserController {
    private final UserServiceImpl userService;

    /**
     * Instantiates a new User controller.
     *
     * @param userService the user service
     */
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    /**
     * Save user response message.
     *
     * @param user the user
     * @return the response message
     */
    @PostMapping
    public ResponseMessage saveUser(@RequestBody @Valid User user){
        return userService.saveUser(user);

    }

    /**
     * Gets user.
     *
     * @param id the id
     * @return the user
     */
    @GetMapping("{id}")
    public ResponseMessage getUser(@PathVariable UUID id) {
        return userService.getUserById(id);
    }

    /**
     * Gets all user.
     *
     * @return the all user
     */
    @GetMapping()
    public ResponseMessage getAllUser() {
        return userService.getAllUser();
    }

    /**
     * Gets all paginated user.
     *
     * @param pagingRequest the paging request
     * @return the all paginated user
     */
    @PostMapping("/paginated")
    public Page<User> getAllPaginatedUser(@RequestBody PagingRequest pagingRequest) {
        return userService.getAllUserPaginated(pagingRequest);
    }

    @GetMapping("/rental-history")
    private ResponseMessage getRental(){
        List<PropertyRentalHistory> list = userService.getRental();
        return new ResponseMessage("success", HttpStatus.OK,list);
    }
}
