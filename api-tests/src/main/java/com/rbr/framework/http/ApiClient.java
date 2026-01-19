package com.rbr.framework.http;

import com.rbr.framework.config.TestConfig;
import io.restassured.response.Response;

import static com.rbr.framework.http.RequestSpecificationFactory.defaultSpec;

public class ApiClient {

    private Response logIfEnabled(Response response) {
        if (TestConfig.apiLog()) {
            response.then().log().all();
        }
        return response;
    }

    public Response get(String path) {
        Response response = defaultSpec().when().get(path);

        return logIfEnabled(response);
    }

    public Response post(String path, Object body) {
        Response response = defaultSpec()
                .body(body)
                .when()
                .post(path);

        return logIfEnabled(response);
    }
}
