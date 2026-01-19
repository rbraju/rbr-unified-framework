package com.rbr.framework.model.jsonplaceholder;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class User {
    private int id;
    private String name;
    private String username;
    private String email;
    private Address address;
    private String phone;
    private String website;
    private Company company;
}
