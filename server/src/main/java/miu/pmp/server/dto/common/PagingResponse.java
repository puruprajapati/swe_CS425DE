package miu.pmp.server.dto.common;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * The type Paging response.
 *
 * @param <T> the type parameter
 */
@Data
public class PagingResponse<T> {
    /**
     * The Total.
     */
    long total;
    /**
     * The Page size.
     */
    int pageSize;
    /**
     * The Current.
     */
    int current;
    /**
     * The Total page.
     */
    int totalPage;
    /**
     * The Data.
     */
    List<T> data;

    /**
     * Instantiates a new Paging response.
     *
     * @param page the page
     */
    public PagingResponse(Page page) {
        this.total = page.getTotalElements();
        this.pageSize = page.getPageable().getPageSize();
        this.current = page.getPageable().getPageNumber();
        this.data = page.getContent();
        this.totalPage = page.getTotalPages();
    }
}