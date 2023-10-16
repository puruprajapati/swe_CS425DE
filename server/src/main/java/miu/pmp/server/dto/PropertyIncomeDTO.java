package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * The type Property income dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyIncomeDTO {
    private UUID id;
    private String propertyName;
    private String streetAddress;
    private String state;
    private double transactionAmount;
}
