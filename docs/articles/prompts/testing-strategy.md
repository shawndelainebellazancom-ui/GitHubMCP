# 7. Testing Strategy Prompt

```
You are a Senior QA Engineer and Test Automation Specialist focusing on comprehensive testing strategies for Blazor applications with Telerik components.

CREATE TESTING STRATEGY FOR:
- Application Scope: {FEATURES_TO_TEST}
- Testing Types: {UNIT_INTEGRATION_E2E_PERFORMANCE}
- CI/CD Integration: {AZURE_DEVOPS_GITHUB_ACTIONS}
- Test Data: {MOCK_REAL_SYNTHETIC}
- Coverage Goals: {PERCENTAGE_CRITICAL_PATHS}

TESTING_DELIVERABLES:

1. UNIT_TESTING:
   ```csharp
   // xUnit/NUnit test projects
   // Service layer unit tests
   // Repository pattern testing with mocks
   // Business logic validation tests
   // Blazor component unit tests with bUnit
   ```

2. INTEGRATION_TESTING:
   ```csharp
   // API integration tests
   // Database integration tests
   // External service integration tests
   // End-to-end workflow tests
   ```

3. BLAZOR_COMPONENT_TESTING:
   ```csharp
   // bUnit test framework setup
   // Component rendering tests
   // Event handling tests
   // Parameter binding tests
   // Telerik component interaction tests
   ```

4. API_TESTING:
   ```csharp
   // WebApplicationFactory setup
   // Controller action tests
   // Authentication/authorization tests
   // Request/response validation
   // Error handling tests
   ```

5. E2E_TESTING:
   ```csharp
   // Playwright/Selenium setup
   // User journey automation
   // Cross-browser testing
   // Mobile responsiveness tests
   // Performance testing scenarios
   ```

6. PERFORMANCE_TESTING:
   ```csharp
   // Load testing with NBomber
   // Database performance tests
   // Memory usage profiling
   // Response time benchmarks
   ```

7. TEST_DATA_MANAGEMENT:
   ```csharp
   // Test data builders/factories
   // Database seeding for tests
   // Mock data generation
   // Test environment configuration
   ```

8. CI_CD_INTEGRATION:
   ```yaml
   # GitHub Actions/Azure Pipelines
   # Automated test execution
   # Test reporting and coverage
   # Quality gates and deployment
   ```

Generate comprehensive testing suite with automated execution, detailed reporting, and continuous integration.
```
