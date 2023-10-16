package miu.pmp.server.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.ChargeCollection;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Price;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import miu.pmp.server.domain.Property;
import miu.pmp.server.domain.PropertyRentalHistory;
import miu.pmp.server.domain.Transaction;
import miu.pmp.server.domain.User;
import miu.pmp.server.dto.NotificationDTO;
import miu.pmp.server.dto.payment.CheckoutSessionDTO;
import miu.pmp.server.dto.payment.TransactionDTO;
import miu.pmp.server.dto.payment.UpdateTransactionDTO;
import miu.pmp.server.service.PaymentService;
import miu.pmp.server.service.PropertyRentalHistoryService;
import miu.pmp.server.service.TransactionService;
import miu.pmp.server.utils.email.EmailDetails;
import miu.pmp.server.utils.email.service.EmailService;
import miu.pmp.server.utils.enums.ECurrency;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * The type Payment service.
 */
@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;
    private final PropertyServiceImpl propertyService;
    private final SimpMessagingTemplate template;
    private static final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

    private final TransactionService transactionService;

    private final EmailService emailService;

    private final PropertyRentalHistoryService propertyRentalHistoryService;


    @Value("${client.admin}")
    private String adminUrl;

    @Value("${client.domain}")
    private String clientUrl;


    /**
     * Instantiates a new Payment service.
     *
     * @param transactionService           the transaction service
     * @param propertyService              the property service
     * @param emailService                 the email service
     * @param propertyRentalHistoryService the property rental history service
     * @param template                     the template
     */
    public PaymentServiceImpl(TransactionService transactionService, PropertyServiceImpl propertyService, EmailService emailService, PropertyRentalHistoryService propertyRentalHistoryService,SimpMessagingTemplate template) {
        this.transactionService = transactionService;
        this.propertyService = propertyService;
        this.propertyRentalHistoryService = propertyRentalHistoryService;
        this.emailService = emailService;
        this.template = template;
    }

    /**
     * Init.
     */
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public void handleSessionSucceeded(Session session) throws StripeException {
        // Get payment intent
        String paymentIntentId = session.getPaymentIntent();

        PaymentIntent paymentIntent =
                PaymentIntent.retrieve(
                        paymentIntentId
                );


        // Get charge from payment intent
        ChargeCollection charges = paymentIntent.getCharges();
        Charge charge = charges.getData().stream().findFirst().get();

        log.warn("Charge {} - {} - receipt: {}", charge.getId(), charge.getAmountCaptured(), charge.getReceiptUrl() );

        // Get metadata
        Map<String, String> metadata = session.getMetadata();
        UUID propertyId = UUID.fromString(metadata.get("property_id"));
        UUID rentalPropertyHistoryId = UUID.fromString(metadata.get("rental_property_history_id"));
        UUID transactionId = UUID.fromString(metadata.get("transaction_id"));

        // Get transaction
        UpdateTransactionDTO dto = new UpdateTransactionDTO();
        dto.setId(transactionId);
        dto.setTransactionId(charge.getId());
        dto.setStatus(charge.getStatus());
        dto.setReceiptUrl(charge.getReceiptUrl());
        transactionService.update(dto);

        // send Email
        Property property = propertyService.getById(propertyId);
        this.template.convertAndSend("/topic/landlords", new NotificationDTO(property.getOwnedBy().getId().toString(),"Your property has been rented!"));
        User landlord = property.getOwnedBy();

        EmailDetails emailData = new EmailDetails();
        emailData.setRecipient(landlord.getEmail());
        emailData.setSubject("Your room was rented");
        String link = "";
        emailData.setMsgBody("Hello, " + landlord.getFirstName() + "\n " +
                "Your room was rented, please click this link: \n "
                + adminUrl + "/properties" +
                "\n Regards, \n PMP Team");
        emailService.sendSimpleMail(emailData);
    }

    @Value("${client.domain}")
    private String clientDomain;

    @Override
    public Session stripeCheckout(CheckoutSessionDTO body) throws StripeException {
        Property property = propertyService.getById(body.getPropertyId());
        String currency = ECurrency.USD.getValue();

        PropertyRentalHistory hist = propertyRentalHistoryService.findById(body.getPropertyRentalHistoryId());
        // Save payment transaction into database
        Transaction transaction = transactionService.findByPropertyId(property.getId());
        if (transaction == null) {
            // Create a product
            Map<String, Object> params = new HashMap<>();
            params.put("name", property.getPropertyName());
            params.put("description", property.getDescription());
            com.stripe.model.Product product = com.stripe.model.Product.create(params);

            TransactionDTO transactionDTO = new TransactionDTO();
            transactionDTO.setProductId(product.getId());
            transactionDTO.setPropertyRentalHistoryId(body.getPropertyRentalHistoryId());

            // Create price id for product
            Map<String, Object> priceParams = new HashMap<>();

            priceParams.put("unit_amount", Double.valueOf(hist.getTransactionAmount()).longValue() * 100L);
            priceParams.put("currency", currency);
            priceParams.put("product", product.getId());
            Price price = Price.create(priceParams);

            // Set price id
            transactionDTO.setPriceId(price.getId());

            // Save transaction
            transaction = transactionService.save(transactionDTO);
        }

        // Metadata
        Map<String, String> initialMetadata = new HashMap<>();
        initialMetadata.put("property_id", property.getId().toString());
        initialMetadata.put("rental_property_history_id", transaction.getPropertyRentalHistory().getId().toString());
        initialMetadata.put("transaction_id", transaction.getId().toString());

        String paymentURL = clientDomain + "/payment/" + body.getPropertyRentalHistoryId();

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .putAllMetadata(initialMetadata)
                        .setSuccessUrl(paymentURL + "?success=true&session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl(paymentURL + "?canceled=true")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        // Set price id
                                        .setPrice(transaction.getPriceId())
                                        .build())
                        .build();
        Session session = Session.create(params);
        session.setMetadata(initialMetadata);

        return session;
    }
}
