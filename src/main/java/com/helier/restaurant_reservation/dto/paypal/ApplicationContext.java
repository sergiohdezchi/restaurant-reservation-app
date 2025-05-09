package com.helier.restaurant_reservation.dto.paypal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ApplicationContext {
    @JsonProperty("brand_name")
    private String brandName;

    @JsonProperty("return_url")
    private String returnURL;

    @JsonProperty("cancel_url")
    private String cancelURL;
}
