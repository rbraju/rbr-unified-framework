# RBR Unified Testing Framework

A comprehensive, enterprise-grade testing framework designed to support both **API testing** (Java-based) and **UI testing** (Playwright/TypeScript-based) in a unified, maintainable, and scalable architecture.

## 🎯 Overview

This framework provides a robust foundation for automated testing with a clear separation of concerns, environment-based configuration management, and industry-standard tooling. The architecture emphasizes code reusability, maintainability, and extensibility.

The framework is organized into two independent but complementary testing modules that can be used together or separately depending on your testing needs.

## 🏗️ Framework Structure

The RBR Unified Framework consists of two main modules, each with its own architecture, dependencies, and test execution capabilities:

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

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (for API tests)
- **Maven 3.6+** (for API tests)
- **Node.js 16+** (for UI tests)
- **npm** or **yarn** (for UI tests)

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

## 🎯 Common Features

Both modules share common principles:

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

The two modules are designed to work independently but can be integrated:

1. **Parallel Execution**: Run API and UI tests in parallel for faster feedback
2. **Data Sharing**: Use API tests to set up test data for UI tests
3. **Validation**: Combine API and UI tests for comprehensive validation
4. **CI/CD**: Both modules can be integrated into CI/CD pipelines

## 📈 Project Organization

### Directory Structure
```
rbr-unified-framework/
├── api-tests/          # API testing module
├── ui-tests/           # UI testing module
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

## 🔐 Security Considerations

Both modules follow security best practices:

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
