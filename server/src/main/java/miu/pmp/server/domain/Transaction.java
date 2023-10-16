package miu.pmp.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * The type Transaction.
 */
@Entity
@Data
@Table(name = "transactions")
@SQLDelete(sql = "UPDATE products SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Transaction extends BaseEntity{
    private String productId;

    private String priceId;

    private String transactionId;

    private String status;

    private String receiptUrl;

    @OneToOne
    @JsonIgnore
    private PropertyRentalHistory propertyRentalHistory;
}
