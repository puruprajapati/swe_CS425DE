package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Payment request dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDTO {
    private String paymentMethodType;

    private String currency;

    private Long amount;

    private String email;
}
