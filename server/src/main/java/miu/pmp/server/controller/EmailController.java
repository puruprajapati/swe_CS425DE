package miu.pmp.server.controller;

import miu.pmp.server.utils.email.EmailDetails;
import miu.pmp.server.utils.email.service.impl.EmailServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Email controller.
 */
@RestController
@RequestMapping("api/mail")
public class EmailController {

    private final EmailServiceImpl emailService;

    /**
     * Instantiates a new Email controller.
     *
     * @param emailService the email service
     */
    public EmailController(EmailServiceImpl emailService) {
        this.emailService = emailService;
    }

    /**
     * Send mail string.
     *
     * @param details the details
     * @return the string
     */
// Sending a simple Email
    @PostMapping("/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status
                = emailService.sendSimpleMail(details);

        return status;
    }

    /**
     * Send mail with attachment string.
     *
     * @param details the details
     * @return the string
     */
// Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}
