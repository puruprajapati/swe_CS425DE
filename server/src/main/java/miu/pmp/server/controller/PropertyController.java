package miu.pmp.server.controller;

import com.google.common.base.CaseFormat;
import miu.pmp.server.domain.Property;
import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.dto.NotificationDTO;
import miu.pmp.server.dto.RentDTO;
import miu.pmp.server.dto.common.PagingResponse;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.service.impl.PropertyServiceImpl;
import miu.pmp.server.service.impl.UserServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * The type Property controller.
 */
@RestController
@RequestMapping("/api/properties")
@CrossOrigin
public class PropertyController {
    private final SimpMessagingTemplate template;
    private final PropertyServiceImpl propertyService;
    private final UserServiceImpl userService;

    /**
     * Instantiates a new Property controller.
     *
     * @param propertyService the property service
     * @param userService     the user service
     * @param template        the template
     */
    public PropertyController(PropertyServiceImpl propertyService, UserServiceImpl userService,SimpMessagingTemplate template) {
        this.propertyService = propertyService;
        this.userService = userService;
        this.template = template;
    }

    @GetMapping
    private PagingResponse<Property> getProperty(Pageable pageable, @RequestParam Optional<String> location, @RequestParam Optional<Integer> room) {
        if(location.isPresent()||room.isPresent()){
            var loc = location.isPresent()?"%"+location.get()+"%":"%%";
            var r = room.isPresent()?room.get():0;
            Page<Property> data = propertyService.findAllwithFilter(pageable,loc,r);
            return new PagingResponse<Property>(data);
        }else{
            Page<Property> data = propertyService.findAll(pageable);
            return new PagingResponse<Property>(data);
        }

    }
    @GetMapping("/{id}")
    private ResponseEntity<Property> getByID(@PathVariable UUID id){
        Property data = propertyService.getById(id);
        return ResponseEntity.ok(data);
    }

    /**
     * Rent response message.
     *
     * @param id   the id
     * @param body the body
     * @return the response message
     */
    @PostMapping("/rent/{id}")
    public ResponseMessage rent(@PathVariable UUID id, @RequestBody RentDTO body){
        PropertyRentalHistory hist = propertyService.rent(id,body);

        return new ResponseMessage("success", HttpStatus.CREATED,hist);
    }

    @GetMapping("/property-by-income")
    private ResponseMessage getPropertyByIncome(@RequestParam Optional<UUID> userId){
        UUID uId = null;
        if(userId.isPresent()){
            uId = userId.get();
        }
        return propertyService.propertyByIncome(uId);
    }

    /**
     * Gets all paginated properties.
     *
     * @param pagingRequest the paging request
     * @return the all paginated properties
     */
    @GetMapping("/paginated")
    public PagingResponse<Property> getAllPaginatedProperties(Pageable pagingRequest) {
        var data = propertyService.getAllPaginatedProperties(pagingRequest);
        return new PagingResponse<>(data);

    }

    /**
     * Gets all landlord properties.
     *
     * @param pagingRequest the paging request
     * @param ownerId       the owner id
     * @return the all landlord properties
     */
    @GetMapping("/paginated/{ownerId}")
    public PagingResponse<Property> getAllLandlordProperties(Pageable pagingRequest, @PathVariable UUID ownerId) {
        var data = propertyService.getAllLandlordProperties(pagingRequest, ownerId);
        return new PagingResponse<>(data);

    }

    /**
     * Gets all rented properties.
     *
     * @param pagingRequest the paging request
     * @return the all rented properties
     */
    @GetMapping("/rented/paginated")
    public PagingResponse<Property> getAllRentedProperties(Pageable pagingRequest) {
        var data = propertyService.getAllRentedProperties(pagingRequest);
        return new PagingResponse<>(data);

    }


    private Sort convertDtoSortToDaoSort(Sort dtoSort) {
        return Sort.by(dtoSort.get()
                .map(sortOrder -> sortOrder.withProperty(CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, sortOrder.getProperty())))
                .collect(Collectors.toList())
        );
    }

    /**
     * Send response entity.
     *
     * @return the response entity
     * @throws Exception the exception
     */
    @GetMapping("/test/noti")
    public ResponseEntity<String> send() throws Exception {
        this.template.convertAndSend("/topic/tenants", new NotificationDTO("sai","testmsg"));
        this.template.convertAndSend("/topic/landlords", new NotificationDTO("ROLE_LANDLORD","test msg"));
        return ResponseEntity.ok("Success");
    }

}
