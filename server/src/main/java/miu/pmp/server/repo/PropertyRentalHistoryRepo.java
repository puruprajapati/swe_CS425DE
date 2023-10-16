package miu.pmp.server.repo;

import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * The interface Property rental history repo.
 */
@Repository
public interface PropertyRentalHistoryRepo  extends PagingAndSortingRepository<PropertyRentalHistory, UUID> {

    /**
     * Find all by rented by list.
     *
     * @param user the user
     * @return the list
     */
    List<PropertyRentalHistory> findAllByRentedBy(User user);

    /**
     * Find all by property owned by list.
     *
     * @param user the user
     * @return the list
     */
    List<PropertyRentalHistory> findAllByPropertyOwnedBy(User user);

    /**
     * Find by property id list.
     *
     * @param uuid the uuid
     * @return the list
     */
    List<PropertyRentalHistory> findByPropertyId(UUID uuid);


    /**
     * Find all by end date before list.
     *
     * @param startDate the start date
     * @param endDate   the end date
     * @return the list
     */
    @Query(value = "SELECT * \n" +
            "FROM property_rental_history as e \n" +
            "WHERE e.end_date BETWEEN :startDate AND :endDate",
            nativeQuery = true)
    List<PropertyRentalHistory> findAllByEndDateBefore(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
