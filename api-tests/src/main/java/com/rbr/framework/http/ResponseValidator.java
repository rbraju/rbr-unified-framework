package com.rbr.framework.http;

import io.restassured.response.Response;
import static org.assertj.core.api.Assertions.assertThat;

public class ResponseValidator {

    private ResponseValidator() {
    }

    public static void assertStatus(Response response, int expectedStatusCode) {
        assertThat(response.getStatusCode())
                .as("HTTP status code")
                .isEqualTo(expectedStatusCode);
    }
}
