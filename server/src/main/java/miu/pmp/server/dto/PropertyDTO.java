package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miu.pmp.server.domain.PropertyImage;

import java.util.List;

/**
 * The type Property dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDTO {
    private String propertyName;
    private String description;
    private String streetAddress;
    private String city;
    private String state;
    private int zipCode;
    private String propertyType;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private double rentAmount;
    private double securityDepositAmount;
    private boolean isOccupied;
    private List<PropertyImage> photos;
    private boolean active;
}
