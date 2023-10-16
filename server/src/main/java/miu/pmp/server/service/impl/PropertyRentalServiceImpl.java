package miu.pmp.server.service.impl;

import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.repo.PropertyRentalHistoryRepo;
import miu.pmp.server.service.PropertyRentalHistoryService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * The type Property rental service.
 */
@Service
public class PropertyRentalServiceImpl implements PropertyRentalHistoryService {
    private final PropertyRentalHistoryRepo propertyRentalHistoryRepo;

    /**
     * Instantiates a new Property rental service.
     *
     * @param propertyRentalHistoryRepo the property rental history repo
     */
    public PropertyRentalServiceImpl(PropertyRentalHistoryRepo propertyRentalHistoryRepo) {
        this.propertyRentalHistoryRepo = propertyRentalHistoryRepo;
    }

    @Override
    public PropertyRentalHistory findById(UUID id) {
        Optional<PropertyRentalHistory> data = propertyRentalHistoryRepo.findById(id);
        if(!data.isPresent()){
            return null;
        }
        return data.get();
    }

    @Override
    public Object findAll() {
        Iterable list =  propertyRentalHistoryRepo.findAll();
        return StreamSupport.stream(list.spliterator(), false).collect(Collectors.toList());
    }
}
