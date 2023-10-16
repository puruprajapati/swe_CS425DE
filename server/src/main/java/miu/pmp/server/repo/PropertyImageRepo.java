package miu.pmp.server.repo;

import miu.pmp.server.domain.PropertyImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * The interface Property image repo.
 */
@Repository
public interface PropertyImageRepo extends CrudRepository<PropertyImage, UUID> {
}
