package miu.pmp.server.domain;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * The type Property.
 */
@Entity
@Data
@Table(name = "properties")
@SQLDelete(sql = "UPDATE properties SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Property extends BaseEntity{
    @Column(name = "property_name")
    private String propertyName;

    @Column(length = 2048)
    private String description;
    @Column(name = "street_address")
    private String streetAddress;
    private String city;
    private String state;
    @Column(name = "zip_code")
    private int zipCode;
    @Column(name = "property_type")
    private String propertyType;
    @Column(name = "no_of_bedroom")
    private int numberOfBedrooms;
    @Column(name = "no_of_bathroom")
    private int numberOfBathrooms;
    @Column(name = "rent_amount")
    private double rentAmount;
    @Column(name = "securityDepositAmount")
    private double securityDepositAmount;
    @Column(name = "is_occupied")
    private boolean isOccupied;


    private boolean active = true;

    @OneToMany
    @JoinColumn(name = "property_id")
    private List<PropertyImage> photos;

    @OneToOne
    private User ownedBy;

    @OneToOne
    private User lastRentedBy;

    @Column(name="last_rented_date")
    private Date lastRentedDate;

    // just to track the current rented information
    @OneToOne
    @JoinColumn(name = "property_rental_history_id")
    private PropertyRentalHistory propertyRentalHistory;
}
