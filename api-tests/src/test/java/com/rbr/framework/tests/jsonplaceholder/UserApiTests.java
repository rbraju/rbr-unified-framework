package com.rbr.framework.tests.jsonplaceholder;

import com.rbr.framework.tests.BaseTest;
import com.rbr.framework.tests.jsonplaceholder.utils.UserUtil;
import org.testng.Assert;
import org.testng.annotations.Test;

import static com.rbr.framework.core.TestContext.api;

public class UserApiTests extends BaseTest {

    @Test
    public void testGetUserById() {
        var response = api().get("/users/1");
        Assert.assertEquals(response.getStatusCode(), 200);
    }

    @Test
    public void createUser() {
        var response = api().post("/users", UserUtil.getDefaultUser());
        Assert.assertEquals(response.getStatusCode(), 201);
    }
}
