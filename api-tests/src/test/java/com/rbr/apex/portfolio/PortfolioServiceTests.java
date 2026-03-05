package com.rbr.apex.portfolio;

import org.testng.annotations.Test;

import static com.rbr.framework.core.TestContext.api;

public class PortfolioServiceTests {

    @Test
    public void getAllPortfolios() {
        var response = api().get("/api/v1/portfolios");
        response.then().statusCode(200);
    }
}
