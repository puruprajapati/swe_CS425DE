package miu.pmp.server.service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import miu.pmp.server.dto.payment.CheckoutSessionDTO;

/**
 * The interface Payment service.
 */
public interface PaymentService {
    /**
     * Handle session succeeded.
     *
     * @param session the session
     * @throws StripeException the stripe exception
     */
    void handleSessionSucceeded(Session session) throws StripeException;

    /**
     * Stripe checkout session.
     *
     * @param body the body
     * @return the session
     * @throws StripeException the stripe exception
     */
    Session stripeCheckout(CheckoutSessionDTO body) throws StripeException;
}
