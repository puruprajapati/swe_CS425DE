package miu.pmp.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Notification dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private String to;
    private String message;
}
