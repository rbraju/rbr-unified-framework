# RBR Unified Testing Framework

A comprehensive, enterprise-grade testing framework designed to support both **API testing** (Java-based) and **UI testing** (Playwright/TypeScript-based) in a unified, maintainable, and scalable architecture.

## 🎯 Overview

This framework provides a robust foundation for automated testing with a clear separation of concerns, environment-based configuration management, and industry-standard tooling. The architecture emphasizes code reusability, maintainability, and extensibility.

## 🏗️ Architecture

The framework is organized into two main modules:

### 1. API Testing Module (`api-tests/`)
- **Language**: Java 17
- **Testing Framework**: TestNG
- **HTTP Client**: Rest-Assured 5.5.0
- **Assertions**: AssertJ
- **Build Tool**: Maven
- **Code Generation**: Lombok
- **JSON Processing**: Jackson
- **Reporting**: Allure Framework

### 2. UI Testing Module (`ui-tests/`)
- **Language**: TypeScript
- **Testing Framework**: Playwright
- **Package Manager**: npm
- **Configuration**: Playwright Config (supports Chromium, Firefox, WebKit)

## 📁 Project Structure

```
rbr-unified-framework/
├── api-tests/
│   ├── src/
│   │   ├── main/java/com/rbr/framework/
│   │   │   ├── config/          # Configuration management
│   │   │   ├── core/            # Core framework components
│   │   │   ├── http/            # HTTP client abstractions
│   │   │   ├── model/           # Data models (DTOs)
│   │   │   └── utils/           # Utility classes
│   │   └── test/
│   │       ├── java/            # Test classes
│   │       └── resources/       # Test configuration files
│   └── pom.xml
├── ui-tests/
│   ├── tests/                   # Playwright test files
│   ├── playwright.config.ts     # Playwright configuration
│   └── package.json
└── README.md
```

## ✨ Key Features

### Configuration Management
- **Environment-based configuration**: Support for DEV, STAGING, and PROD environments
- **Type-safe configuration access**: Typed getters for configuration values (string, int, boolean)
- **Flexible property loading**: Environment-specific `.properties` files
- **Runtime environment selection**: Set via system property (`-Denv=STAGING`)

### HTTP Client Abstraction
- **Unified API client**: Clean, fluent interface for API calls
- **Request specification factory**: Centralized request configuration
- **Automatic logging**: Configurable API request/response logging
- **Response validation**: Helper utilities for common assertions

### Test Context Management
- **Thread-local test context**: Thread-safe test data management
- **API client per thread**: Isolated API clients for parallel test execution
- **Test data storage**: Flexible key-value storage for test data sharing

### Code Quality & Maintainability
- **Builder pattern**: Lombok-generated builders for complex objects
- **Separation of concerns**: Clear layer separation (config, http, core, tests)
- **Base test class**: Common test setup and logging
- **Utility classes**: Reusable test data generators

### Security & Best Practices
- **Dependency management**: Up-to-date versions with security fixes
- **Vulnerability mitigation**: Explicit dependency exclusions for known vulnerabilities
- **Type safety**: Strong typing throughout the framework
- **Immutable configurations**: Singleton pattern for configuration access

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Maven 3.6+**
- **Node.js 16+** (for UI tests)
- **npm** or **yarn**

### Installation

#### API Tests Setup
```bash
cd api-tests
mvn clean install
```

#### UI Tests Setup
```bash
cd ui-tests
npm install
```

### Configuration

#### API Tests Configuration
1. Create environment-specific property files in `api-tests/src/test/resources/`:
   - `dev.properties`
   - `staging.properties`
   - `prod.properties`

2. Example `staging.properties`:
```properties
base.url=https://jsonplaceholder.typicode.com
timeout=30000
api.log=true
```

3. Run tests with environment selection:
```bash
mvn test -Denv=STAGING
```

#### UI Tests Configuration
Configure browsers and test settings in `playwright.config.ts`:
- Default: Runs on Chromium, Firefox, and WebKit
- Parallel execution enabled
- HTML reporter configured

## 🧪 Running Tests

### API Tests
```bash
# Run all tests with default environment (STAGING)
mvn test

# Run tests with specific environment
mvn test -Denv=DEV

# Run specific test class
mvn test -Dtest=UserApiTests

# Run with Allure reporting
mvn test
mvn allure:serve
```

### UI Tests
```bash
# Run all UI tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests for specific browser
npx playwright test --project=chromium

# View test report
npx playwright show-report
```

## 📚 Framework Components

### Configuration Layer (`config/`)

#### `ConfigLoader`
- Loads environment-specific configuration files
- Provides type-safe accessors for configuration values
- Supports required and optional properties with defaults

#### `TestConfig`
- Domain-specific configuration facade
- Provides typed accessors for common test configuration
- Examples: `baseUrl()`, `timeout()`, `apiLog()`

#### `Environment`
- Enum for supported environments (DEV, STAGING, PROD)

### HTTP Layer (`http/`)

#### `ApiClient`
- High-level API client with fluent interface
- Supports GET, POST (extensible for PUT, DELETE, etc.)
- Configurable request/response logging

#### `RequestSpecificationFactory`
- Creates standardized request specifications
- Applies base URL, content type, and headers
- Configurable logging

#### `ResponseValidator`
- AssertJ-based response validation utilities
- Fluent assertion methods for common validations

### Core Layer (`core/`)

#### `TestContext`
- Thread-local storage for test data
- Thread-safe API client management
- Enables data sharing between test steps

### Test Layer

#### `BaseTest`
- Base class for all test classes
- Common setup and logging
- Allure step annotations

#### Example Test: `UserApiTests`
```java
public class UserApiTests extends BaseTest {
    @Test
    public void testGetUserById() {
        var response = api().get(BASE_URL + "/users/1");
        Assert.assertEquals(response.getStatusCode(), 200);
    }
    
    @Test
    public void createUser() {
        var response = api().post(BASE_URL + "/users", UserUtil.getDefaultUser());
        Assert.assertEquals(response.getStatusCode(), 201);
    }
}
```

## 🔧 Extending the Framework

### Adding New API Endpoints
1. Create data models in `model/` package using Lombok builders
2. Create utility classes for test data generation
3. Write test classes extending `BaseTest`
4. Use `TestContext.api()` for API calls

### Adding New Environments
1. Add enum value to `Environment` class
2. Create corresponding `.properties` file in `test/resources/`
3. Run tests with `-Denv=<ENVIRONMENT_NAME>`

### Adding UI Test Pages
1. Create page object models (recommended)
2. Write test specs in `ui-tests/tests/`
3. Configure in `playwright.config.ts` if needed

## 📦 Dependencies

### API Tests Key Dependencies
- **TestNG 7.9.0**: Testing framework
- **Rest-Assured 5.5.0**: API testing
- **AssertJ 3.25.1**: Fluent assertions
- **Lombok 1.18.32**: Boilerplate reduction
- **Jackson 2.15.2**: JSON processing
- **Allure 2.21.0**: Test reporting
- **SLF4J 2.0.9**: Logging

### UI Tests Key Dependencies
- **Playwright 1.57.0**: Browser automation
- **TypeScript**: Type safety

## 🎓 Design Patterns & Best Practices

1. **Singleton Pattern**: Configuration classes are singletons
2. **Factory Pattern**: Request specifications created via factory
3. **Builder Pattern**: Data models use Lombok builders
4. **Facade Pattern**: TestConfig provides simplified configuration access
5. **Thread-Local Pattern**: TestContext uses thread-local for thread safety
6. **Separation of Concerns**: Clear layer separation
7. **DRY Principle**: Reusable utilities and base classes
8. **Type Safety**: Strong typing throughout

## 🔐 Security Considerations

- Updated dependency versions to mitigate known vulnerabilities
- Explicit exclusion of vulnerable transitive dependencies
- Environment-based configuration for sensitive data
- No hardcoded credentials (uses configuration files)

## 📈 Future Enhancements

- [ ] Database testing utilities
- [ ] Performance testing integration
- [ ] CI/CD pipeline integration examples
- [ ] Advanced reporting and dashboards
- [ ] Test data management framework
- [ ] API mocking capabilities
- [ ] Custom Playwright reporters

## 🤝 Contributing

This is a unified testing framework designed for scalability and maintainability. When adding features:
- Follow the existing architecture patterns
- Maintain separation of concerns
- Add appropriate logging and error handling
- Update this README with new features

---
**Built with ❤️ for robust, maintainable, and scalable test automation**
