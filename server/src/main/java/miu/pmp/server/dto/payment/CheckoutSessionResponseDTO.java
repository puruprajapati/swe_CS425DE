package miu.pmp.server.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Checkout sessions response dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutSessionResponseDTO {
    private String sessionId;

    private String url;
}
