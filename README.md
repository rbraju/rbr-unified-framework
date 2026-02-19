# RBR Unified Testing Framework

A comprehensive, enterprise-grade testing framework designed to support both **API testing** (Java-based) and **UI testing** (Playwright/TypeScript-based) in a unified, maintainable, and scalable architecture.

## 🎯 Overview

This framework provides a robust foundation for automated testing with a clear separation of concerns, environment-based configuration management, and industry-standard tooling. The architecture emphasizes code reusability, maintainability, and extensibility.

The framework is organized into three independent but complementary testing modules that can be used together or separately depending on your testing needs.

## 🏗️ Framework Structure

The RBR Unified Framework consists of three main modules, each with its own architecture, dependencies, and test execution capabilities:

```
rbr-unified-framework/
├── api-tests/              # API Testing Module (Java/TestNG/Rest-Assured)
│   ├── README.md          # API Tests specific documentation
│   ├── pom.xml            # Maven configuration
│   └── src/               # Source code and tests
├── ui-tests/              # UI Testing Module (TypeScript/Playwright)
│   ├── README.md          # UI Tests specific documentation
│   ├── package.json       # npm configuration
│   ├── playwright.config.ts
│   └── tests/             # Test specifications
├── perf-tests/            # Performance Testing Module
│   ├── gatling/           # Gatling-based performance tests (Scala)
│   │   ├── pom.xml        # Maven configuration
│   │   └── src/           # Gatling simulation scenarios
│   └── k6/                # Grafana K6-based performance tests (JavaScript)
├── docs/                  # Additional documentation
├── pipelines/             # CI/CD pipeline configurations
└── README.md             # This file
```

## 📦 Module Overview

### 1. API Testing Module (`api-tests/`)

**Purpose**: Automated API/backend testing using Java-based tools.

**Key Technologies**:
- Java 17
- TestNG
- Rest-Assured
- Allure Reporting

**Architecture**: Layered architecture with configuration, HTTP, core, model, and test layers.

**See [api-tests/README.md](api-tests/README.md) for detailed documentation.**

### 2. UI Testing Module (`ui-tests/`)

**Purpose**: Automated browser/UI testing using TypeScript and Playwright.

**Key Technologies**:
- TypeScript
- Playwright
- Page Object Model (POM)

**Architecture**: Page Object Model pattern with base page classes and domain-specific page implementations.

**See [ui-tests/README.md](ui-tests/README.md) for detailed documentation.**

### 3. Performance Testing Module (`perf-tests/`)

**Purpose**: Load and performance testing using multiple tools.

**Sub-modules**:

#### 3a. Gatling Tests (`perf-tests/gatling/`)

**Key Technologies**:
- Scala
- Gatling
- Maven

**Architecture**: Gatling simulation scenarios for load testing and performance analysis.

#### 3b. Grafana K6 Tests (`perf-tests/k6/`)

**Key Technologies**:
- JavaScript
- Grafana K6
- Node.js

**Architecture**: K6 scripts for performance and load testing with modern JavaScript syntax.

**See [perf-tests/](perf-tests/) for performance testing scenarios.**

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (for API tests and Gatling performance tests)
- **Maven 3.6+** (for API tests and Gatling performance tests)
- **Node.js 16+** (for UI tests and K6 performance tests)
- **npm** or **yarn** (for UI tests)
- **Grafana K6** (for K6 performance tests - [Installation Guide](https://k6.io/docs/getting-started/installation/))

### Installation

#### API Tests
```bash
cd api-tests
mvn clean install
```

#### UI Tests
```bash
cd ui-tests
npm install
npx playwright install  # Install browser binaries
```

#### Performance Tests

**Gatling Tests:**
```bash
cd perf-tests/gatling
mvn clean install
```

**Grafana K6 Tests:**
```bash
cd perf-tests/k6
# K6 is installed globally or via package manager
# No build step required for K6 scripts
```

## 🧪 Running Tests

### API Tests
```bash
cd api-tests
mvn test                  # Run all tests
mvn test -Denv=STAGING    # Run with specific environment
mvn allure:serve          # View Allure reports
```

### UI Tests
```bash
cd ui-tests
npx playwright test                    # Run all tests
npx playwright test --headed           # Run in headed mode
npx playwright test --project=chromium # Run on specific browser
npx playwright show-report             # View test report
```

### Performance Tests

**Gatling Tests:**
```bash
cd perf-tests/gatling
mvn gatling:test                        # Run all Gatling simulations
mvn gatling:test -Dgatling.simulationClass=com.rbr.perf.SimpleSimulation  # Run specific simulation
# Reports are generated in target/gatling/
```

**Grafana K6 Tests:**
```bash
cd perf-tests/k6
k6 run script.js                        # Run a K6 script
k6 run --vus 10 --duration 30s script.js  # Run with specific load parameters
# Results are displayed in console and can be exported to various formats
```

## 📚 Documentation

Each module has its own comprehensive README with detailed information:

- **[API Tests README](api-tests/README.md)**: Complete guide for API testing framework
  - Architecture details
  - Configuration management
  - Framework components
  - Extension guide

- **[UI Tests README](ui-tests/README.md)**: Complete guide for UI testing framework
  - Page Object Model pattern
  - Playwright configuration
  - Test writing guidelines
  - Best practices

- **[Performance Tests](perf-tests/)**: Performance testing with Gatling and Grafana K6
  - **Gatling**: Scala-based load testing scenarios
  - **Grafana K6**: JavaScript-based performance testing scripts
  - Performance metrics and reporting
  - Load testing patterns and best practices

## 🎯 Common Features

All modules share common principles:

### Design Patterns
- **Separation of Concerns**: Clear layer separation
- **DRY Principle**: Reusable components and utilities
- **Type Safety**: Strong typing throughout
- **Base Classes**: Common functionality in base classes

### Configuration Management
- **Environment-based**: Support for multiple environments
- **External Configuration**: No hardcoded values
- **Type-safe Access**: Typed getters for configuration values

### Best Practices
- **Maintainability**: Clear structure and naming conventions
- **Scalability**: Extensible architecture
- **Reporting**: Comprehensive test reporting
- **Error Handling**: Proper error handling and meaningful messages

## 🔧 Integration

The three modules are designed to work independently but can be integrated:

1. **Parallel Execution**: Run API, UI, and performance tests in parallel for faster feedback
2. **Data Sharing**: Use API tests to set up test data for UI tests
3. **Validation**: Combine API and UI tests for comprehensive validation
4. **Performance Validation**: Use performance tests to validate system behavior under load
5. **CI/CD**: All modules can be integrated into CI/CD pipelines

## 📈 Project Organization

### Directory Structure
```
rbr-unified-framework/
├── api-tests/          # API testing module
├── ui-tests/           # UI testing module
├── perf-tests/         # Performance testing module
├── docs/               # Shared documentation
├── pipelines/          # CI/CD configurations
└── README.md          # Main documentation (this file)
```

### Module Independence
- Each module has its own dependencies
- Independent build and execution
- Can be used separately or together
- Shared documentation in `docs/` folder

## 🤝 Contributing

When contributing to the framework:

1. **Follow Module Patterns**: Maintain consistency with existing architecture
2. **Update Documentation**: Keep README files up to date
3. **Add Examples**: Include usage examples for new features
4. **Test Changes**: Ensure all tests pass before submitting

## 📖 Learning Resources

### API Tests
- [TestNG Documentation](https://testng.org/doc/documentation-main.html)
- [Rest-Assured Documentation](https://rest-assured.io/)
- [Allure Framework](https://docs.qameta.io/allure/)

### UI Tests
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

### Performance Tests
- **Gatling**:
  - [Gatling Documentation](https://gatling.io/docs/)
  - [Scala Documentation](https://www.scala-lang.org/documentation/)
  - [Gatling Best Practices](https://gatling.io/docs/gatling/reference/current/general/best-practices/)
- **Grafana K6**:
  - [K6 Documentation](https://k6.io/docs/)
  - [K6 JavaScript API](https://k6.io/docs/javascript-api/)
  - [K6 Best Practices](https://k6.io/docs/using-k6/best-practices/)

## 🔐 Security Considerations

All modules follow security best practices:

- **No Hardcoded Credentials**: All sensitive data in configuration files
- **Environment Separation**: Different configs for different environments
- **Dependency Management**: Regular updates for security patches
- **Access Control**: Proper access control in CI/CD pipelines

## 📞 Support

For questions or issues:

1. Check the respective module's README for detailed documentation
2. Review existing tests for examples
3. Refer to the official documentation of underlying frameworks

---

**Built with ❤️ for robust, maintainable, and scalable test automation**
