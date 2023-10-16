package miu.pmp.server.repo;

import miu.pmp.server.domain.Transaction;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * The interface Transaction repo.
 */
@Repository
public interface TransactionRepo extends PagingAndSortingRepository<Transaction, UUID> {
    /**
     * Find by property rental history id transaction.
     *
     * @param propertyRentalHistoryId the property rental history id
     * @return the transaction
     */
    Transaction findByPropertyRentalHistoryId(@Param("property_rental_history_id") UUID propertyRentalHistoryId);
}
