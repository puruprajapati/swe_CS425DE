package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * The type Rent dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentDTO {
    private LocalDate startDate;
    private LocalDate endDate;
}
