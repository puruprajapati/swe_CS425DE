package miu.pmp.server.controller;

import com.google.common.base.CaseFormat;
import miu.pmp.server.domain.Role;
import miu.pmp.server.domain.User;
import miu.pmp.server.dto.common.PagingResponse;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.security.service.impl.AuthServiceImpl;
import miu.pmp.server.service.RoleService;
import miu.pmp.server.service.UserService;
import miu.pmp.server.service.impl.PropertyRentalServiceImpl;
import miu.pmp.server.service.impl.PropertyServiceImpl;
import miu.pmp.server.utils.enums.ERole;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.stream.Collectors;

/**
 * The type Admin controller.
 */
@RestController
@RequestMapping("api/admin")
@CrossOrigin
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    private final AuthServiceImpl authService;

    private final PropertyServiceImpl propertyService;

    private final PropertyRentalServiceImpl rentalHistory;

    /**
     * Instantiates a new Admin controller.
     *
     * @param userService     the user service
     * @param roleService     the role service
     * @param authService     the auth service
     * @param propertyService the property service
     * @param rentalHistory   the rental history
     */
    public AdminController(UserService userService, RoleService roleService, AuthServiceImpl authService, PropertyServiceImpl propertyService,PropertyRentalServiceImpl rentalHistory) {
        this.userService = userService;
        this.roleService = roleService;
        this.authService = authService;
        this.propertyService = propertyService;
        this.rentalHistory = rentalHistory;
    }

    /**
     * Gets landlords.
     *
     * @param pagingRequest the paging request
     * @param keywords      the keywords
     * @return the landlords
     */
    @GetMapping("/landlords")
    public PagingResponse<User> getLandlords(Pageable pagingRequest, @RequestParam(required = false) String keywords) {
        Role role = roleService.findByName(ERole.ROLE_LANDLORD.getRole());
        PageRequest daoPageable = PageRequest.of(
                pagingRequest.getPageNumber(),
                pagingRequest.getPageSize(),
                convertDtoSortToDaoSort(pagingRequest.getSort())
        );

        var data = userService.getAllByRoleIdAndKeywords(daoPageable, role, keywords != null ? keywords : "");
        return new PagingResponse<>(data);
    }

    /**
     * Gets tenants.
     *
     * @param pagingRequest the paging request
     * @param keywords      the keywords
     * @return the tenants
     */
    @GetMapping("/tenants")
    public PagingResponse<User> getTenants(Pageable pagingRequest, @RequestParam(required = false) String keywords) {
        Role role = roleService.findByName(ERole.ROLE_TENANT.getRole());

        PageRequest daoPageable = PageRequest.of(
                pagingRequest.getPageNumber(),
                pagingRequest.getPageSize(),
                convertDtoSortToDaoSort(pagingRequest.getSort())
        );
        var data = userService.getAllByRoleIdAndKeywords(daoPageable, role, keywords);
        return new PagingResponse<>(data);

    }


    /**
     * Deactivate user response entity.
     *
     * @param id the id
     * @return the response entity
     * @throws Throwable the throwable
     */
    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<ResponseMessage> deactivateUser(@PathVariable UUID id) throws Throwable {
        var responseMessage = authService.activateUser(id, false);
        return ResponseEntity.ok(responseMessage);
    }

    /**
     * Activate user response entity.
     *
     * @param id the id
     * @return the response entity
     * @throws Throwable the throwable
     */
    @PutMapping("/users/{id}/activate")
    public ResponseEntity<ResponseMessage> activateUser(@PathVariable UUID id) throws Throwable {
        var responseMessage = authService.activateUser(id, true);

        return ResponseEntity.ok(responseMessage);
    }

//    @GetMapping("/propertyincome")
//    public ResponseEntity<ResponseMessage> perpertyIncome(){
//        return ResponseEntity.ok( propertyService.propertyIncome());
//    }

    private Sort convertDtoSortToDaoSort(Sort dtoSort) {
        return Sort.by(dtoSort.get()
                .map(sortOrder -> sortOrder.withProperty(CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, sortOrder.getProperty())))
                .collect(Collectors.toList())
        );
    }

    /**
     * Count response message.
     *
     * @return the response message
     */
    @GetMapping("/properties/rental-history")
    public ResponseMessage count(){
        Object list = rentalHistory.findAll();
        return new ResponseMessage("success", HttpStatus.OK,list);
    }
}
