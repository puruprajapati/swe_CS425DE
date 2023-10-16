package miu.pmp.server.domain;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * The type Property image.
 */
@Entity
@Data
@Table(name="property_images")
@SQLDelete(sql = "UPDATE property_images SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class PropertyImage extends BaseEntity{
    private String imageUrl;
}
