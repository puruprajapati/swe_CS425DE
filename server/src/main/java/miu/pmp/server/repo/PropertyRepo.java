package miu.pmp.server.repo;

import miu.pmp.server.domain.Property;
import miu.pmp.server.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * The interface Property repo.
 */
@Repository
public interface PropertyRepo extends PagingAndSortingRepository<Property, UUID> {
    /**
     * Find all by city is like ignore case or state is like ignore case and number of bedrooms greater than equal and active is true and owned by active is true page.
     *
     * @param page the page
     * @param loc  the loc
     * @param loc2 the loc 2
     * @param room the room
     * @return the page
     */
    Page<Property> findAllByCityIsLikeIgnoreCaseOrStateIsLikeIgnoreCaseAndNumberOfBedroomsGreaterThanEqualAndActiveIsTrueAndOwnedByActiveIsTrue(Pageable page, String loc, String loc2, int room);

    /**
     * Find by last rented date not null page.
     *
     * @param page the page
     * @return the page
     */
    Page<Property> findByLastRentedDateNotNull(Pageable page);

    /**
     * Find all by owned by page.
     *
     * @param page the page
     * @param u    the u
     * @return the page
     */
    Page<Property> findAllByOwnedBy(Pageable page, User u);

    /**
     * Find all by active is true page.
     *
     * @param page the page
     * @return the page
     */
    Page<Property> findAllByActiveIsTrue(Pageable page);

    /**
     * Find all by active is true and owned by active is true page.
     *
     * @param page the page
     * @return the page
     */
    Page<Property> findAllByActiveIsTrueAndOwnedByActiveIsTrue(Pageable page);

    /**
     * Custom find by owner list.
     *
     * @param id the id
     * @return the list
     */
    @Query(value = "select * from properties p where p.owned_by_id =?1", nativeQuery = true)
    List<Property> customFindByOwner(UUID id);

    /**
     * Custom search page.
     *
     * @param page  the page
     * @param s     the s
     * @param id    the id
     * @param rooms the rooms
     * @return the page
     */
    @Query(value = "SELECT *\n" +
            "FROM Properties p\n" +
            "WHERE (lower(p.property_name) LIKE ?1\n" +
            "   or lower(p.state) LIKE ?1\n" +
            "   or lower(p.property_type) LIKE ?1\n" +
            "   or lower(p.city) LIKE ?1\n" +
            "   or lower(p.description) LIKE ?1\n" +
            "   or lower(p.property_type) LIKE ?1\n" +
            "   or lower(p.street_address) LIKE ?1)\n" +
            "AND p.no_of_bedroom >= ?3\n" +
            "AND p.owned_by_id=?2 \n" +
            "AND p.is_deleted = false",
            nativeQuery = true)
    Page<Property> customSearch(Pageable page, String s, UUID id, int rooms);

//    @Query(value = "select\n" +
//      "        p.id,\n" +
//      "        p.property_name,\n" +
//      "        p.street_address,\n" +
//      "        p.state,\n" +
//      "        sum(prh.transaction_amount) as transaction_amount\n" +
//      "    from\n" +
//      "        properties p\n" +
//      "    inner join\n" +
//      "        property_rental_history prh\n" +
//      "            on p.id = prh.property_id\n" +
//      "    inner join\n" +
//      "        transactions t\n" +
//      "            on prh.id = t.property_rental_history_id\n" +
//      "    group by\n" +
//      "        p.id",
//      nativeQuery = true)
//     List<PropertyIncomeDTO> propertyIncome();

}
