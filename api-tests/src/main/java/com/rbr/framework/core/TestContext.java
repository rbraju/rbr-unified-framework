package com.rbr.framework.core;

import com.rbr.framework.http.ApiClient;

import java.util.HashMap;
import java.util.Map;

public class TestContext {

    private final Map<String, Object> contextData = new HashMap<>();

    private static final ThreadLocal<ApiClient> client = ThreadLocal.withInitial(ApiClient::new);

    public static ApiClient api() {
        return client.get();
    }

    public void set(String key, Object value) {
        contextData.put(key, value);
    }

    @SuppressWarnings("unchecked")
    public <T> T get(String key) {
        return (T) contextData.get(key);
    }

    public void clear() {
        contextData.clear();
    }
}
