package miu.pmp.server.utils.email.service;

import miu.pmp.server.utils.email.EmailDetails;

/**
 * The interface Email service.
 */
public interface EmailService {
    /**
     * Send simple mail string.
     *
     * @param details the details
     * @return the string
     */
// Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    /**
     * Send mail with attachment string.
     *
     * @param details the details
     * @return the string
     */
// Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details);
}
