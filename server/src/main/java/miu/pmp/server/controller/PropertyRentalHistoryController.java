package miu.pmp.server.controller;

import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.service.PropertyRentalHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * The type Property rental history controller.
 */
@RestController
@RequestMapping("/api/property-rental-histories")
@CrossOrigin
public class PropertyRentalHistoryController {

    private final PropertyRentalHistoryService propertyRentalHistoryService;

    /**
     * Instantiates a new Property rental history controller.
     *
     * @param propertyRentalHistoryService the property rental history service
     */
    public PropertyRentalHistoryController(PropertyRentalHistoryService propertyRentalHistoryService) {
        this.propertyRentalHistoryService = propertyRentalHistoryService;
    }

    @GetMapping("/{id}")
    private ResponseEntity<PropertyRentalHistory> getByID(@PathVariable UUID id){
        PropertyRentalHistory data = propertyRentalHistoryService.findById(id);
        return ResponseEntity.ok(data);
    }
}
