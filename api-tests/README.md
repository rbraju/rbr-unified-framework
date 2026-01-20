# API Tests Framework

A comprehensive, enterprise-grade API testing framework built with Java, TestNG, and Rest-Assured. This framework provides a robust foundation for automated API testing with clear separation of concerns, environment-based configuration management, and industry-standard tooling.

## 🏗️ Architecture Overview

The API testing framework follows a layered architecture pattern, ensuring maintainability, scalability, and reusability. The framework is organized into distinct layers, each with a specific responsibility:

```
api-tests/
├── src/
│   ├── main/java/com/rbr/framework/
│   │   ├── config/          # Configuration Management Layer
│   │   ├── core/            # Core Framework Components
│   │   ├── http/            # HTTP Client Abstractions
│   │   ├── model/           # Data Models (DTOs)
│   │   └── utils/           # Utility Classes
│   └── test/
│       ├── java/            # Test Classes
│       └── resources/       # Test Configuration Files
└── pom.xml
```

## 📦 Technology Stack

- **Language**: Java 17
- **Testing Framework**: TestNG 7.9.0
- **HTTP Client**: Rest-Assured 5.5.0
- **Assertions**: AssertJ 3.25.1
- **Build Tool**: Maven
- **Code Generation**: Lombok 1.18.32
- **JSON Processing**: Jackson 2.15.2
- **Reporting**: Allure Framework 2.21.0
- **Logging**: SLF4J 2.0.9

## 🏛️ Framework Architecture

### 1. Configuration Layer (`config/`)

The configuration layer provides environment-based, type-safe configuration management.

#### `Environment`
- Enum defining supported environments: `DEV`, `STAGING`, `PROD`
- Environment selection via system property: `-Denv=STAGING`

#### `ConfigLoader`
- Singleton pattern for configuration access
- Loads environment-specific `.properties` files
- Provides type-safe accessors:
  - `get(String key)` - Required string property
  - `get(String key, String defaultValue)` - Optional string property
  - `getInt(String key, int defaultValue)` - Integer property with default
  - `getBoolean(String key, boolean defaultValue)` - Boolean property with default
- Runtime environment detection from system property

#### `TestConfig`
- Facade pattern for domain-specific configuration
- Provides typed accessors for common test configuration:
  - `baseUrl()` - Base API URL
  - `timeout()` - Request timeout (default: 30000ms)
  - `apiLog()` - Enable/disable API request/response logging

**Example Configuration File** (`staging.properties`):
```properties
base.url=https://jsonplaceholder.typicode.com
timeout=30000
api.log=true
```

### 2. HTTP Layer (`http/`)

The HTTP layer provides abstractions for API interactions with a clean, fluent interface.

#### `RequestSpecificationFactory`
- Factory pattern for creating standardized request specifications
- Applies base configuration:
  - Base URI from `TestConfig`
  - Content-Type: `application/json`
  - Accept: `application/json`
- Configurable request/response logging

#### `ApiClient`
- High-level API client with fluent interface
- Methods:
  - `get(String path)` - GET request
  - `post(String path, Object body)` - POST request
  - Extensible for PUT, DELETE, PATCH, etc.
- Automatic response logging when enabled
- Thread-safe per test context

#### `ResponseValidator`
- AssertJ-based response validation utilities
- Fluent assertion methods for common validations
- Type-safe response validation

### 3. Core Layer (`core/`)

The core layer provides thread-safe test context management.

#### `TestContext`
- Thread-local storage for test data
- Thread-local API client management
- Enables data sharing between test steps
- Methods:
  - `api()` - Get thread-local `ApiClient` instance
  - `set(String key, Object value)` - Store test data
  - `get(String key)` - Retrieve test data
  - `clear()` - Clear context data

**Usage Example**:
```java
import static com.rbr.framework.core.TestContext.api;

var response = api().get("/users/1");
```

### 4. Model Layer (`model/`)

The model layer contains Data Transfer Objects (DTOs) for API request/response payloads.

- **Lombok Builders**: All models use Lombok's `@Builder` annotation
- **Immutable Objects**: Models are designed to be immutable where possible
- **JSON Serialization**: Automatic Jackson-based JSON serialization/deserialization

**Example Model**:
```java
@Builder
@Data
public class User {
    private Long id;
    private String name;
    private String email;
    // ... other fields
}
```

### 5. Test Layer (`test/`)

The test layer contains actual test implementations.

#### `BaseTest`
- Abstract base class for all test classes
- Common setup and logging via `@BeforeMethod`
- Allure step annotations for reporting
- Logging via SLF4J

#### Test Structure
- Extend `BaseTest` for all test classes
- Use `TestContext.api()` for API calls
- Organize tests by domain/API (e.g., `jsonplaceholder/`)

**Example Test**:
```java
public class UserApiTests extends BaseTest {
    @Test
    public void testGetUserById() {
        var response = api().get("/users/1");
        Assert.assertEquals(response.getStatusCode(), 200);
    }
}
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Installation

1. **Navigate to the api-tests directory**:
```bash
cd api-tests
```

2. **Build the project**:
```bash
mvn clean install
```

### Configuration

1. **Create environment-specific property files** in `src/test/resources/`:
   - `dev.properties`
   - `staging.properties`
   - `prod.properties`

2. **Example `staging.properties`**:
```properties
base.url=https://jsonplaceholder.typicode.com
timeout=30000
api.log=true
```

3. **Run tests with environment selection**:
```bash
# Default environment (STAGING)
mvn test

# Specific environment
mvn test -Denv=DEV
mvn test -Denv=PROD
```

## 🧪 Running Tests

### Run All Tests
```bash
mvn test
```

### Run Tests for Specific Environment
```bash
mvn test -Denv=STAGING
```

### Run Specific Test Class
```bash
mvn test -Dtest=UserApiTests
```

### Run Specific Test Method
```bash
mvn test -Dtest=UserApiTests#testGetUserById
```

### Generate and View Allure Reports
```bash
mvn test
mvn allure:serve
```

## 🔧 Extending the Framework

### Adding New API Endpoints

1. **Create Data Models** in `model/` package:
```java
@Builder
@Data
public class NewModel {
    // fields
}
```

2. **Create Utility Classes** for test data generation:
```java
public class NewModelUtil {
    public static NewModel getDefaultModel() {
        return NewModel.builder()
            // set fields
            .build();
    }
}
```

3. **Write Test Classes** extending `BaseTest`:
```java
public class NewApiTests extends BaseTest {
    @Test
    public void testEndpoint() {
        var response = api().get("/endpoint");
        // assertions
    }
}
```

### Adding New HTTP Methods

Extend `ApiClient` class:
```java
public Response put(String path, Object body) {
    Response response = defaultSpec()
            .body(body)
            .when()
            .put(path);
    return logIfEnabled(response);
}

public Response delete(String path) {
    Response response = defaultSpec()
            .when()
            .delete(path);
    return logIfEnabled(response);
}
```

### Adding New Environments

1. Add enum value to `Environment` class:
```java
public enum Environment {
    DEV,
    STAGING,
    PROD,
    QA  // New environment
}
```

2. Create corresponding `.properties` file in `test/resources/`:
   - `qa.properties`

3. Run tests with the new environment:
```bash
mvn test -Denv=QA
```

### Adding Custom Validators

Extend `ResponseValidator` class with custom validation methods:
```java
public static void assertStatusCode(Response response, int expectedStatus) {
    assertThat(response.getStatusCode()).isEqualTo(expectedStatus);
}
```

## 📚 Design Patterns Used

1. **Singleton Pattern**: Configuration classes (`ConfigLoader`)
2. **Factory Pattern**: `RequestSpecificationFactory` for request specifications
3. **Builder Pattern**: Lombok builders for data models
4. **Facade Pattern**: `TestConfig` provides simplified configuration access
5. **Thread-Local Pattern**: `TestContext` uses thread-local for thread safety
6. **Template Method Pattern**: `BaseTest` provides test template

## 🔐 Best Practices

1. **Environment-based Configuration**: Never hardcode URLs or credentials
2. **Type Safety**: Use typed getters for configuration values
3. **Thread Safety**: Always use `TestContext.api()` for API calls
4. **Separation of Concerns**: Keep tests, utilities, and models separate
5. **DRY Principle**: Reuse utilities and base classes
6. **Immutability**: Use immutable models where possible
7. **Logging**: Enable API logging for debugging, disable for production runs

## 📊 Reporting

The framework integrates with Allure Framework for comprehensive test reporting:

- **Test Results**: Pass/fail status
- **API Logs**: Request/response details
- **Test Steps**: Allure step annotations
- **Screenshots**: (when applicable)
- **Environment Information**: Test environment details

## 🔍 Troubleshooting

### Configuration File Not Found
Ensure the `.properties` file exists in `src/test/resources/` with the correct environment name.

### Environment Not Recognized
Use valid environment names: `DEV`, `STAGING`, or `PROD`. Case-insensitive.

### Thread Safety Issues
Always use `TestContext.api()` instead of creating new `ApiClient` instances.

## 📈 Future Enhancements

- [ ] Database testing utilities
- [ ] Performance testing integration
- [ ] API mocking capabilities
- [ ] GraphQL support
- [ ] WebSocket testing support
- [ ] Enhanced Allure reporting
- [ ] Test data management framework
