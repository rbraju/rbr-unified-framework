package com.rbr.framework.model.jsonplaceholder;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Address {
    private String street;
    private String suite;
    private String city;
    private String zipcode;
    private Geo geo;
}
