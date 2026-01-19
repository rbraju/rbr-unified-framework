package com.rbr.framework.model.jsonplaceholder;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Geo {
    private String lat;
    private String lng;
}
