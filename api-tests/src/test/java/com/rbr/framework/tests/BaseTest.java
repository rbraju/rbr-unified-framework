package com.rbr.framework.tests;

import io.qameta.allure.Step;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.ITestResult;
import org.testng.annotations.BeforeMethod;

public abstract class BaseTest {

    private static final Logger logger = LoggerFactory.getLogger(BaseTest.class);

    @BeforeMethod
    @Step("Initialize API test context")
    void setup(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        logger.info("Running test: {}", testName);
    }
}
