package miu.pmp.server.service;

import miu.pmp.server.domain.Transaction;
import miu.pmp.server.dto.payment.TransactionDTO;
import miu.pmp.server.dto.payment.UpdateTransactionDTO;

import java.util.UUID;

/**
 * The interface Transaction service.
 */
public interface TransactionService {
    /**
     * Find by property id transaction.
     *
     * @param propertyId the property id
     * @return the transaction
     */
    Transaction findByPropertyId(UUID propertyId);

    /**
     * Save transaction.
     *
     * @param dto the dto
     * @return the transaction
     */
    Transaction save(TransactionDTO dto);

    /**
     * Find by id transaction.
     *
     * @param id the id
     * @return the transaction
     */
    Transaction findById(UUID id);

    /**
     * Update transaction.
     *
     * @param dto the dto
     * @return the transaction
     */
    Transaction update(UpdateTransactionDTO dto);
}
