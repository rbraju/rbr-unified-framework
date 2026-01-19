package com.rbr.framework.model.jsonplaceholder;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Company {
    private String name;
    private String catchPhrase;
    private String bs;
}
