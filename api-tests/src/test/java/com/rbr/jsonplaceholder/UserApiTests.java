package com.rbr.jsonplaceholder;

import com.rbr.framework.model.jsonplaceholder.User;
import com.rbr.framework.tests.BaseTest;
import com.rbr.jsonplaceholder.utils.UserUtil;
import org.testng.annotations.Test;

import static com.rbr.framework.core.TestContext.api;
import static com.rbr.framework.http.ResponseValidator.validate;
import static org.assertj.core.api.Assertions.assertThat;

public class UserApiTests extends BaseTest {

    @Test
    public void testGetUserById() {
        var response = api().get("/users/1");
        validate(response)
                .hasStatus(200)
                .hasBody(User.class, user -> {
                    assertThat(user.getId()).isEqualTo(1);
                    assertThat(user.getName()).isNotBlank();
                    assertThat(user.getUsername()).isNotBlank();
                    assertThat(user.getEmail()).contains("@");
                });
    }

    @Test
    public void createUser() {
        var requestUser = UserUtil.getDefaultUser();
        var response = api().post("/users", requestUser);

        validate(response)
                .hasStatus(201)
                .hasBodyNotEmpty()
                .hasBody(User.class, user -> {
                    assertThat(user.getName()).isEqualTo(requestUser.getName());
                    assertThat(user.getUsername()).isEqualTo(requestUser.getUsername());
                });
    }
}
