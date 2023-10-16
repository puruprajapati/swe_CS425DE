package miu.pmp.server.service.impl;

import miu.pmp.server.domain.Property;
import miu.pmp.server.domain.PropertyImage;
import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.domain.User;
import miu.pmp.server.dto.PropertyDTO;
import miu.pmp.server.dto.PropertyIncomeDTO;
import miu.pmp.server.dto.RentDTO;
import miu.pmp.server.dto.Top10PropertyLeaseEndDTO;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.exceptionHandler.exceptions.CustomErrorException;
import miu.pmp.server.repo.PropertyImageRepo;
import miu.pmp.server.repo.PropertyRentalHistoryRepo;
import miu.pmp.server.repo.PropertyRepo;
import miu.pmp.server.repo.UserRepo;
import miu.pmp.server.service.PropertyService;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

/**
 * The type Property service.
 */
@Service
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepo propertyRepo;
    private final PropertyRentalHistoryRepo rentalRepo;

    private final UserRepo userRepo;

    private final PropertyImageRepo imageRepo;

    private final PropertyRentalHistoryRepo propertyRentalHistoryRepo;


    /**
     * Instantiates a new Property service.
     *
     * @param propertyRepo              the property repo
     * @param rentalRepo                the rental repo
     * @param userRepo                  the user repo
     * @param imageRepo                 the image repo
     * @param propertyRentalHistoryRepo the property rental history repo
     */
    public PropertyServiceImpl(PropertyRepo propertyRepo, PropertyRentalHistoryRepo rentalRepo, UserRepo userRepo, PropertyImageRepo imageRepo, PropertyRentalHistoryRepo propertyRentalHistoryRepo) {
        this.propertyRepo = propertyRepo;
        this.rentalRepo = rentalRepo;
        this.userRepo = userRepo;
        this.imageRepo = imageRepo;
        this.propertyRentalHistoryRepo = propertyRentalHistoryRepo;
    }

    public Page<Property> findAll(Pageable pageable) {
        return propertyRepo.findAllByActiveIsTrueAndOwnedByActiveIsTrue(pageable);
    }

    @Override
    public Property getById(UUID id) {
        Optional<Property> data = propertyRepo.findById(id);
        if (!data.isPresent()) {
            throw new CustomErrorException(HttpStatus.NOT_FOUND, "Property Not found");
        }
        return data.get();
    }

    @Override
    public PropertyRentalHistory rent(UUID id, RentDTO rentdto) {
        PropertyRentalHistory hist = new PropertyRentalHistory();
        Optional<Property> p = propertyRepo.findById(id);
        if (p.isPresent()) {
            Property pty = p.get();
            String uuid = null;
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null) {
                if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
                    KeycloakPrincipal<KeycloakSecurityContext> kp = (KeycloakPrincipal<KeycloakSecurityContext>) authentication.getPrincipal();
                    uuid = kp.getKeycloakSecurityContext().getToken().getSubject();
                }
            }
            var diff = DAYS.between(rentdto.getStartDate(),rentdto.getEndDate());

            User user = userRepo.findById(UUID.fromString(uuid)).get();
            hist.setRentedBy(user);
            hist.setProperty(pty);
            hist.setEndDate(rentdto.getEndDate());
            hist.setStartDate(rentdto.getStartDate());
            hist.setTransactionAmount(diff*(pty.getRentAmount()+pty.getSecurityDepositAmount()));
            rentalRepo.save(hist);

            pty.setLastRentedBy(user);
            pty.setLastRentedDate(new Date());
            propertyRepo.save(pty);
            return hist;
        } else {
            throw new CustomErrorException(HttpStatus.NOT_FOUND, "Property not found!");
        }

    }

    @Override
    public Page<Property> findAllwithFilter(Pageable page, String loc, int r) {
        return propertyRepo.findAllByCityIsLikeIgnoreCaseOrStateIsLikeIgnoreCaseAndNumberOfBedroomsGreaterThanEqualAndActiveIsTrueAndOwnedByActiveIsTrue(page, loc,loc, r);
    }

    @Override
    public Page<Property> findAllByOwner(Pageable page) {
        UUID uuid = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
                KeycloakPrincipal<KeycloakSecurityContext> kp = (KeycloakPrincipal<KeycloakSecurityContext>) authentication.getPrincipal();
                uuid = UUID.fromString(kp.getKeycloakSecurityContext().getToken().getSubject());
            }
        }
        User user = userRepo.findById(uuid).get();
        return propertyRepo.findAllByOwnedBy(page, user);
    }

    @Override
    public Property save(PropertyDTO pty) {
        UUID owner = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
                KeycloakPrincipal<KeycloakSecurityContext> kp = (KeycloakPrincipal<KeycloakSecurityContext>) authentication.getPrincipal();
                owner = UUID.fromString(kp.getKeycloakSecurityContext().getToken().getSubject());
            }
        }
        User user = userRepo.findById(owner).get();
        List<PropertyImage> image = pty.getPhotos();
        List<PropertyImage> imgs = image.stream().map(item -> {
            var img = new PropertyImage();
            img.setImageUrl(item.getImageUrl());
            imageRepo.save(img);
            return img;
        }).collect(Collectors.toList());
        Property p = new Property();
        p.setLastRentedBy(null);
        p.setCity(pty.getCity());
        p.setDescription(pty.getDescription());
        p.setPropertyName(pty.getPropertyName());
        p.setPropertyType(pty.getPropertyType());
        p.setPhotos(imgs);
        p.setOccupied(false);
        p.setNumberOfBathrooms(pty.getNumberOfBathrooms());
        p.setNumberOfBedrooms(pty.getNumberOfBedrooms());
        p.setState(pty.getState());
        p.setZipCode(pty.getZipCode());
        p.setStreetAddress(pty.getStreetAddress());
        p.setRentAmount(pty.getRentAmount());
        p.setOwnedBy(user);
        p.setSecurityDepositAmount(pty.getSecurityDepositAmount());
        return propertyRepo.save(p);
    }

    @Override
    public Page<Property> search(Pageable page, String s, int room) {
        UUID owner = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
                KeycloakPrincipal<KeycloakSecurityContext> kp = (KeycloakPrincipal<KeycloakSecurityContext>) authentication.getPrincipal();
                owner = UUID.fromString(kp.getKeycloakSecurityContext().getToken().getSubject());
            }
        }
        return propertyRepo.customSearch(page, "%" + s.toLowerCase() + "%", owner, room);
    }

    @Override
    public void delete(UUID s) {
        Optional<Property> p = propertyRepo.findById(s);
        if (p.isPresent()) {
            propertyRepo.delete(p.get());
        } else {
            throw new CustomErrorException(HttpStatus.NOT_FOUND, "Property not found");
        }

    }

    @Override
    public void update(PropertyDTO pty, UUID s) {
        UUID owner = UUID.fromString("655cb8f5-80c9-43af-830c-f8b309d9e508");
//    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//    if (authentication != null) {
//      if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
//        KeycloakPrincipal<KeycloakSecurityContext> kp = (KeycloakPrincipal<KeycloakSecurityContext>) authentication.getPrincipal();
//        uuid = UUID.fromString(kp.getKeycloakSecurityContext().getToken().getId());
//      }
//    }
        User user = userRepo.findById(owner).get();
        List<PropertyImage> image = pty.getPhotos();
        List<PropertyImage> imgs = image.stream().map(item -> {
            var img = new PropertyImage();
            img.setImageUrl(item.getImageUrl());
            imageRepo.save(img);
            return img;
        }).collect(Collectors.toList());

        if (propertyRepo.findById(s).isPresent()) {
            Property p = propertyRepo.findById(s).get();
            p.setCity(pty.getCity());
            p.setDescription(pty.getDescription());
            p.setPropertyName(pty.getPropertyName());
            p.setPropertyType(pty.getPropertyType());
            p.setPhotos(imgs);
            p.setNumberOfBathrooms(p.getNumberOfBathrooms());
            p.setNumberOfBedrooms(p.getNumberOfBedrooms());
            p.setState(p.getState());
            p.setZipCode(p.getZipCode());
            p.setStreetAddress(p.getStreetAddress());
            p.setRentAmount(p.getRentAmount());
            p.setOwnedBy(user);
            p.setSecurityDepositAmount(p.getSecurityDepositAmount());
            propertyRepo.save(p);
        } else {
            throw new CustomErrorException(HttpStatus.NOT_FOUND, "Property not found");
        }

    }


    @Override
    public ResponseMessage activate(UUID id, Boolean isActive) {
        Optional<Property> p = propertyRepo.findById(id);
        if (p.isPresent()) {
            Property property = p.get();
            property.setActive(isActive);
            propertyRepo.save(property);
            return new ResponseMessage("Success", HttpStatus.OK, property);
        } else {
            throw new CustomErrorException(HttpStatus.NOT_FOUND, "Property not found");
        }
    }

    @Override
    public ResponseMessage propertyByIncome(UUID userId) {
        List<Property> properties = new ArrayList<Property>();
        List<PropertyIncomeDTO> results = new ArrayList<PropertyIncomeDTO>();
        if (userId == null) {
            properties = (List<Property>) propertyRepo.findAll();
        } else {
            properties = propertyRepo.customFindByOwner(userId);
//      if (property.isPresent()) {
//        Property p = property.get();
//        properties.add(p);
//      }

        }
        properties.forEach(p -> {
            List<PropertyRentalHistory> prh = rentalRepo.findByPropertyId(p.getId());
            if (prh.size() > 0) {
                PropertyIncomeDTO pi = new PropertyIncomeDTO();
                pi.setId(p.getId());
                pi.setPropertyName(p.getPropertyName());
                pi.setState(p.getState());
                pi.setStreetAddress(pi.getStreetAddress());
                pi.setTransactionAmount(prh.stream().mapToDouble(x -> x.getTransactionAmount()).sum());
                results.add(pi);
            }
        });

        return new ResponseMessage("Success", HttpStatus.OK, results);
//    String sql = "select\n" +
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
//      "        p.id\n";
//    EntityManagerFactory entityManagerFactory = (EntityManagerFactory) appContext
//      .getBean("entityManagerFactory");
//
//    EntityManager entityManager = entityManagerFactory.createEntityManager();
//    javax.persistence.Query query = entityManager.createNativeQuery(sql);
//    List list = query.getResultList();
//    System.out.println("list:" + list);
//    System.out.println("list 0:" + list.get(0));
    }

    @Override
    public ResponseMessage top10LeaseEnd() {
        Top10PropertyLeaseEndDTO dto = new Top10PropertyLeaseEndDTO();
        dto.setDate(LocalDate.now());
        // Get all history end by request month
        LocalDate endDateOfMonth = dto.getDate().withDayOfMonth(dto.getDate().lengthOfMonth());
        LocalDate startDateOfMonth = dto.getDate().withDayOfMonth(1);
        var histories = propertyRentalHistoryRepo.findAllByEndDateBefore(startDateOfMonth, endDateOfMonth);

        // Get top 10 properties
        var properties = histories.stream()
                .map(h -> h.getProperty().getId().toString())
                .distinct()
                .limit(10)
                .map(id -> propertyRepo.findById(UUID.fromString(id)))
                .collect(Collectors.toList());

        return new ResponseMessage("Ok", HttpStatus.OK, properties);
    }

    @Override
    public Page<Property> getAllPaginatedProperties(Pageable pageable) {
        return propertyRepo.findAll(pageable);
    }

    @Override
    public Page<Property> getAllLandlordProperties(Pageable pageable, UUID uuid) {
        return propertyRepo.findAll(pageable);
    }

    @Override
    public Page<Property> getAllRentedProperties(Pageable pageable) {
        return propertyRepo.findByLastRentedDateNotNull(pageable);
    }
}
