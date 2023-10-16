package miu.pmp.server.controller;

import miu.pmp.server.dto.NotificationDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * The type Socket controller.
 */
@Controller
public class SocketController {
    /**
     * Send notification dto.
     *
     * @param message the message
     * @return the notification dto
     * @throws Exception the exception
     */
    @MessageMapping("/chat")
    @SendTo("/topic/tenants")
    public NotificationDTO send(NotificationDTO message) throws Exception {
        return message;
    }

    /**
     * Send to landlord notification dto.
     *
     * @param message the message
     * @return the notification dto
     * @throws Exception the exception
     */
    @MessageMapping("/chat2")
    @SendTo("/topic/landlords")
    public NotificationDTO sendToLandlord(NotificationDTO message) throws Exception {
        return message;
    }
}
