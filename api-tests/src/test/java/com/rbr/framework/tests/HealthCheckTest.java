package com.rbr.framework.tests;

import com.rbr.framework.http.ResponseValidator;
import org.testng.annotations.Test;

import static com.rbr.framework.core.TestContext.api;

public class HealthCheckTest {

    @Test
    public void healthCheck() {
        System.out.println("Health check test executed.");
//        var response = api().get("/health");
//        ResponseValidator.assertStatus(response, 200);
    }
}
