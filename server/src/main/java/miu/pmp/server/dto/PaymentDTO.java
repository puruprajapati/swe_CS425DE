package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Payment dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private String clientSecret;
}
