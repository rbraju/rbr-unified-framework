package com.rbr.framework.config;

/**
 * Test configuration accessor providing typed access to test configuration properties.
 * This class acts as a facade over ConfigLoader, providing domain-specific,
 * type-safe accessors for test configuration values.
 */
public final class TestConfig {

    private TestConfig() { }

    public static String baseUrl() {
        return ConfigLoader.get("base.url");
    }

    public static int timeout() {
        return ConfigLoader.getInt("timeout", 30000);
    }

    public static boolean apiLog() {
        return ConfigLoader.getBoolean("api.log", false);
    }
}
