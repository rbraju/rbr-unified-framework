package com.rbr.framework.tests.jsonplaceholder.utils;

import com.rbr.framework.model.jsonplaceholder.Address;
import com.rbr.framework.model.jsonplaceholder.Company;
import com.rbr.framework.model.jsonplaceholder.User;

public class UserUtil {

    public static User getDefaultUser() {
        return User.builder()
                .name("Leanne Graham")
                .username("Bret")
                .email("")
                .phone("1-770-736-8031 x56442")
                .address(Address.builder()
                        .street("Kulas Light")
                        .suite("Apt. 556")
                        .city("Gwenborough")
                        .zipcode("92998-3874")
                        .build())
                .company(Company.builder()
                        .name("Romaguera-Crona")
                        .catchPhrase("Multi-layered client-server neural-net")
                        .bs("harness real-time e-markets")
                        .build())
                .build();
    }
}
