package miu.pmp.server.dto.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * The type Paging request.
 */
@Data
public class PagingRequest {
    private int page;
    private int pageSize;
    private String sortBy;

    @JsonProperty
    private boolean isAscending;
}
