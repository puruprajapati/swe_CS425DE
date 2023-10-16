package miu.pmp.server.utils.enums;

/**
 * The enum E currency.
 */
public enum ECurrency {
    /**
     * Usd e currency.
     */
    USD("USD"),
    ;

    private String value;

    ECurrency(String value) {
        this.value = value;
    }

    /**
     * Gets value.
     *
     * @return the value
     */
    public String getValue() {
        return value;
    }
}
