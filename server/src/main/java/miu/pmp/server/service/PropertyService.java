package miu.pmp.server.service;

import miu.pmp.server.domain.Property;
import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.dto.PropertyDTO;
import miu.pmp.server.dto.RentDTO;
import miu.pmp.server.dto.common.ResponseMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * The interface Property service.
 */
public interface PropertyService {

    /**
     * Find all page.
     *
     * @param pageable the pageable
     * @return the page
     */
    Page<Property> findAll(Pageable pageable);

    /**
     * Gets by id.
     *
     * @param id the id
     * @return the by id
     */
    Property getById(UUID id);

    /**
     * Rent property rental history.
     *
     * @param id      the id
     * @param rentdto the rentdto
     * @return the property rental history
     */
    PropertyRentalHistory rent(UUID id, RentDTO rentdto);

    /**
     * Find allwith filter page.
     *
     * @param page the page
     * @param loc  the loc
     * @param r    the r
     * @return the page
     */
    Page<Property> findAllwithFilter(Pageable page, String loc, int r);

    /**
     * Find all by owner page.
     *
     * @param page the page
     * @return the page
     */
    Page<Property> findAllByOwner(Pageable page);

    /**
     * Save property.
     *
     * @param p the p
     * @return the property
     */
    Property save(PropertyDTO p);

    /**
     * Search page.
     *
     * @param page the page
     * @param s    the s
     * @param room the room
     * @return the page
     */
    Page<Property> search(Pageable page, String s, int room);

    /**
     * Delete.
     *
     * @param s the s
     */
    void delete(UUID s);

    /**
     * Update.
     *
     * @param pty the pty
     * @param s   the s
     */
    void update(PropertyDTO pty,UUID s);
//  List<Property> findPropertiesWithSorting(String field);
//  Page<Property> findPropertiesWithPagination(int offset, int pageSize);
//  Page<Property> findPropertiesWithPaginationAndSorting(int offset,int pageSize,String field);

    /**
     * Activate response message.
     *
     * @param id       the id
     * @param isActive the is active
     * @return the response message
     */
    ResponseMessage activate(UUID id, Boolean isActive);

    /**
     * Property by income response message.
     *
     * @param propertyId the property id
     * @return the response message
     */
    ResponseMessage propertyByIncome(UUID propertyId);

    /**
     * Top 10 lease end response message.
     *
     * @return the response message
     */
    ResponseMessage top10LeaseEnd();

    /**
     * Gets all paginated properties.
     *
     * @param pageable the pageable
     * @return the all paginated properties
     */
    Page<Property> getAllPaginatedProperties(Pageable pageable);

    /**
     * Gets all rented properties.
     *
     * @param pageable the pageable
     * @return the all rented properties
     */
    Page<Property> getAllRentedProperties(Pageable pageable);

    /**
     * Gets all landlord properties.
     *
     * @param pageable the pageable
     * @param ownerId  the owner id
     * @return the all landlord properties
     */
    Page<Property> getAllLandlordProperties(Pageable pageable, UUID ownerId);
}
