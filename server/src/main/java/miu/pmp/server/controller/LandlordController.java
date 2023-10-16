package miu.pmp.server.controller;

import com.google.common.base.CaseFormat;
import miu.pmp.server.domain.Property;
import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.dto.NotificationDTO;
import miu.pmp.server.dto.PropertyDTO;
import miu.pmp.server.dto.common.PagingResponse;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.service.UserService;
import miu.pmp.server.service.impl.PropertyServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * The type Landlord controller.
 */
@RestController
@RequestMapping("api/landlord")
@CrossOrigin
public class LandlordController {
    private final SimpMessagingTemplate template;
    private final PropertyServiceImpl propertyService;
    private final UserService userService;

    /**
     * Instantiates a new Landlord controller.
     *
     * @param template        the template
     * @param propertyService the property service
     * @param userService     the user service
     */
    public LandlordController(SimpMessagingTemplate template, PropertyServiceImpl propertyService,UserService userService) {
        this.template = template;

        this.propertyService = propertyService;
        this.userService = userService;
    }

    /**
     * Gets properties.
     *
     * @param page   the page
     * @param search the search
     * @param room   the room
     * @return the properties
     */
    @GetMapping("/properties")
    public PagingResponse getProperties(Pageable page, @RequestParam Optional<String> search, @RequestParam Optional<Integer> room) {
        if(search.isPresent() || room.isPresent()){
            PageRequest daoPageable = PageRequest.of(
                    page.getPageNumber(),
                    page.getPageSize(),
                    convertDtoSortToDaoSort(page.getSort())
            );

            var searchValue = search.orElse("");
            var roomValue = room.orElse(0);

            Page<Property> list = propertyService.search(daoPageable, searchValue, roomValue);
            return new PagingResponse<Property>(list);
        }
        Page<Property> list = propertyService.findAllByOwner(page);
        return new PagingResponse<Property>(list);
    }

    /**
     * Gets properties.
     *
     * @param id the id
     * @return the properties
     */
    @GetMapping("/properties/{id}")
    public ResponseMessage getProperties(@PathVariable UUID id) {
        Property data = propertyService.getById(id);
        return new ResponseMessage("success", HttpStatus.OK,data);
    }

    /**
     * Add properties response message.
     *
     * @param data the data
     * @return the response message
     */
    @PostMapping("/properties")
    public ResponseMessage addProperties(@RequestBody PropertyDTO data) {
        Property p = propertyService.save(data);
        this.template.convertAndSend("/topic/tenants", new NotificationDTO("sai","New properties has been added!"));
        return new ResponseMessage("success", HttpStatus.CREATED, p);
    }

    /**
     * Update properties response message.
     *
     * @param data the data
     * @param id   the id
     * @return the response message
     */
    @PutMapping("/properties/{id}")
    public ResponseMessage updateProperties(@RequestBody PropertyDTO data,@PathVariable UUID id) {
        propertyService.update(data,id);
        return new ResponseMessage("success", HttpStatus.OK);
    }

    /**
     * Activate response message.
     *
     * @param id the id
     * @return the response message
     */
    @PutMapping("/properties/{id}/activate")
    public ResponseMessage activate(@PathVariable UUID id) {
        return propertyService.activate(id, true);
    }

    /**
     * Deactivate response message.
     *
     * @param id the id
     * @return the response message
     */
    @PutMapping("/properties/{id}/deactivate")
    public ResponseMessage deactivate(@PathVariable UUID id) {
        return propertyService.activate(id, false);
    }

    /**
     * Delete response message.
     *
     * @param id the id
     * @return the response message
     */
    @DeleteMapping("/properties/{id}")
    public ResponseMessage delete(@PathVariable UUID id) {
        propertyService.delete(id);
        return new ResponseMessage("deleted", HttpStatus.OK);
    }


    private Sort convertDtoSortToDaoSort(Sort dtoSort) {
        return Sort.by(dtoSort.get()
                .map(sortOrder -> sortOrder.withProperty(CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, sortOrder.getProperty())))
                .collect(Collectors.toList())
        );
    }

    /**
     * Gets top 10 lease end.
     *
     * @return the top 10 lease end
     */
    @GetMapping("/properties/top10-lease-end")
    public ResponseMessage getTop10LeaseEnd() {
        var result = propertyService.top10LeaseEnd();
        return result;
    }

    @GetMapping("/rental-history")
    private ResponseMessage getRental(){
        List<PropertyRentalHistory> list = userService.getRentalOfOwner();
        return new ResponseMessage("success", HttpStatus.OK, list);
    }
}
