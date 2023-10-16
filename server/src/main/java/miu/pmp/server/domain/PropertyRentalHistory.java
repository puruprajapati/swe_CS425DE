package miu.pmp.server.domain;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * The type Property rental history.
 */
@Entity
@Data
@Table(name="property_rental_history")
@SQLDelete(sql = "UPDATE property_rental_history SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class PropertyRentalHistory extends BaseEntity{
    @ManyToOne
    @JoinColumn(name="rented_by")
    private User rentedBy;

    @ManyToOne
    @JoinColumn(name="property_id")
    private Property property;

    @Column(name="transaction_amount")
    private double transactionAmount;

    @Column(name="start_date")
    private LocalDate startDate;

    @Column(name="end_date")
    private LocalDate endDate;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Transaction transaction;
}
