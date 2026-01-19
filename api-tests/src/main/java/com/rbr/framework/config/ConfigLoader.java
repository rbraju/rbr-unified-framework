package com.rbr.framework.config;

import java.io.InputStream;
import java.util.Properties;

public final class ConfigLoader {

    private static final Properties properties = new Properties();

    private static final Environment currentEnvironment;

    static {
        String envProperty = System.getProperty("env", "STAGING").toUpperCase();
        try {
            currentEnvironment = Environment.valueOf(envProperty);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid environment: " + envProperty + ". Valid values: DEV, STAGING, PROD", e);
        }

        String filename = currentEnvironment.name().toLowerCase() + ".properties";
        try(InputStream is = ConfigLoader.class.getClassLoader().getResourceAsStream(filename)) {
            if (is == null) {
                throw new RuntimeException("Configuration file not found: " + filename);
            }
            properties.load(is);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load configuration file: " + filename, e);
        }
    }

    private ConfigLoader() { }

    public static Environment getEnvironment() {
        return currentEnvironment;
    }

    public static String get(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Required configuration property not found: " + key);
        }
        return value;
    }

    public static String get(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    public static boolean getBoolean(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Required configuration property not found: " + key);
        }
        return Boolean.parseBoolean(value);
    }

    public static boolean getBoolean(String key, boolean defaultValue) {
        String value = properties.getProperty(key);
        return value != null ? Boolean.parseBoolean(value) : defaultValue;
    }

    public static int getInt(String key) {
        String value = get(key);
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid integer value for property: " + key + " = " + value, e);
        }
    }

    public static int getInt(String key, int defaultValue) {
        String value = properties.getProperty(key);
        if (value == null) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid integer value for property: " + key + " = " + value, e);
        }
    }
}
