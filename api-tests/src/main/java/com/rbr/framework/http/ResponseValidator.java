package com.rbr.framework.http;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.response.Response;
import lombok.Getter;

import java.util.function.Consumer;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Enterprise-grade API response validation with fluent assertion chaining.
 * <p>
 * Use for consistent status + body validation, clear failure messages, and
 * centralized behavior (logging, Allure context, etc.).
 * </p>
 * <ul>
 *   <li>Validate status first (fail fast), then body/headers</li>
 *   <li>Chain assertions for readability: validate(response).hasStatus(200).hasBody(...)</li>
 *   <li>Typed body validation with AssertJ or custom Consumer</li>
 *   <li>Optional JSON path for partial or array responses</li>
 * </ul>
 */
@Getter
public final class ResponseValidator {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final Response response;

    private ResponseValidator(Response response) {
        this.response = response;
    }

    /**
     * Start a validation chain for the given response.
     * Prefer this over one-off asserts for status + body flows.
     */
    public static ResponseValidator validate(Response response) {
        return new ResponseValidator(response);
    }

    /**
     * Backward compatible static helper
     */
    public static void assertStatus(Response response, int expectedStatusCode) {
        validate(response).hasStatus(expectedStatusCode);
    }

    /**
     * Asserts HTTP status code. Use first in the chain to fail fast.
     */
    public ResponseValidator hasStatus(int expectedStatusCode) {
        assertThat(response.getStatusCode())
                .as("HTTP status code (body preview: %s)", bodyPreview())
                .isEqualTo(expectedStatusCode);
        return this;
    }

    /**
     * Asserts status is in the 2xx range.
     */
    public ResponseValidator hasSuccessStatus() {
        assertThat(response.getStatusCode())
                .as("HTTP status code should be 2xx (actual: %d, body: %s)", response.getStatusCode(), bodyPreview())
                .isBetween(200, 299);
        return this;
    }

    /**
     * Parse body as the given class and run custom AssertJ/custom assertions.
     * Use for full or partial domain object validation.
     */
    public <T> ResponseValidator hasBody(Class<T> bodyType, Consumer<T> assertions) {
        T body = response.getBody().as(bodyType);
        assertThat(body).as("Response body as %s", bodyType.getSimpleName()).isNotNull();
        assertions.accept(body);
        return this;
    }

    /**
     * Parse body using a TypeReference (e.g. for generics like List&lt;User&gt;).
     */
    public <T> ResponseValidator hasBody(TypeReference<T> typeRef, Consumer<T> assertions) {
        try {
            String raw = response.getBody().asString();
            T body = OBJECT_MAPPER.readValue(raw, typeRef);
            assertThat(body).as("Response body").isNotNull();
            assertions.accept(body);
        } catch (Exception e) {
            throw new AssertionError("Failed to parse response body as " + typeRef.getType(), e);
        }
        return this;
    }

    /**
     * Asserts response body contains the given substring (e.g. for error messages or plain text).
     */
    public ResponseValidator hasBodyContaining(String substring) {
        String body = response.getBody().asString();
        assertThat(body).as("Response body").contains(substring);
        return this;
    }

    /**
     * Asserts response body is non-empty.
     */
    public ResponseValidator hasBodyNotEmpty() {
        String body = response.getBody().asString();
        assertThat(body).as("Response body").isNotBlank();
        return this;
    }

    /**
     * Evaluate JSON path and assert the value.
     */
    public ResponseValidator hasPath(String jsonPath, Object expected) {
        Object actual = response.jsonPath().get(jsonPath);
        assertThat(actual).as("JSON path [%s]", jsonPath).isEqualTo(expected);
        return this;
    }

    /**
     * Display first 200 characters for preview
     */
    private String bodyPreview() {
        String body = response.getBody().asString();
        if (body == null || body.isEmpty()) return "<empty>";
        int max = 200;
        return body.length() <= max ? body : body.substring(0, max) + "...";
    }
}
