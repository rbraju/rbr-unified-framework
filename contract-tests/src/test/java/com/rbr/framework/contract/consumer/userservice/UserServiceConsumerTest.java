package com.rbr.framework.contract.consumer.userservice;

import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.core.model.RequestResponsePact;

import java.util.HashMap;
import java.util.Map;

public class UserServiceConsumerTest {

    public RequestResponsePact createPact(PactDslWithProvider builder) {
        Map<String, String> headers = new HashMap<>();
    }
}
