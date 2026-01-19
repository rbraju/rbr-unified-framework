package com.rbr.framework.http;

import com.rbr.framework.config.TestConfig;
import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;

public class RequestSpecificationFactory {

    private RequestSpecificationFactory() {
    }

    public static RequestSpecification defaultSpec() {
        RequestSpecification requestSpecification =  RestAssured.given()
                .baseUri(TestConfig.baseUrl())
                .contentType("application/json")
                .accept("application/json");

        // Enable logging if configured
        if (TestConfig.apiLog()) {
            requestSpecification = requestSpecification.log().all();
        }

        return requestSpecification;
    }
}
