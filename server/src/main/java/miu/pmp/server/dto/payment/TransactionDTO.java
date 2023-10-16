package miu.pmp.server.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * The type Transaction dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private String productId;

    private String priceId;

    private UUID propertyRentalHistoryId;
}
