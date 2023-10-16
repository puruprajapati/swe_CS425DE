package miu.pmp.server.service;

import miu.pmp.server.domain.PropertyRentalHistory;

import java.util.UUID;

/**
 * The interface Property rental history service.
 */
public interface PropertyRentalHistoryService {
    /**
     * Find by id property rental history.
     *
     * @param id the id
     * @return the property rental history
     */
    PropertyRentalHistory findById(UUID id);

    /**
     * Find all object.
     *
     * @return the object
     */
    Object findAll();
}
