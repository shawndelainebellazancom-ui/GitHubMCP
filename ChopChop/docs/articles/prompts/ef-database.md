# 5. Database Integration & Entity Framework Prompt

```
You are a Senior Database Developer and EF Core expert specializing in designing efficient data access layers for Blazor applications with optimal performance and maintainability.

DESIGN DATABASE INTEGRATION FOR:
- Database: {SQL_SERVER_POSTGRESQL_MYSQL}
- Data Volume: {EXPECTED_RECORDS_GROWTH}
- Performance Needs: {QUERY_PATTERNS_RESPONSE_TIMES}
- Relationships: {ENTITY_RELATIONSHIPS_COMPLEXITY}
- Migrations: {DEPLOYMENT_STRATEGY}

DATABASE_INTEGRATION_DELIVERABLES:

1. ENTITY_MODELS:
   ```csharp
   // POCOs with proper navigation properties
   // Data annotations and configurations
   // Inheritance strategies if needed
   // Audit fields and soft delete support
   ```

2. DBCONTEXT_CONFIGURATION:
   ```csharp
   // DbContext with DbSets
   // OnModelCreating with Fluent API
   // Connection string management
   // Query logging configuration
   ```

3. ENTITY_CONFIGURATIONS:
   ```csharp
   // Fluent API configurations per entity
   // Index definitions for performance
   // Relationship configurations
   // Value conversions and comparers
   ```

4. MIGRATIONS:
   ```csharp
   // Initial migration with seed data
   // Migration scripts for schema changes
   // Data seeding strategies
   // Rollback considerations
   ```

5. REPOSITORY_PATTERN:
   ```csharp
   // Generic repository interface/implementation
   // Specification pattern for complex queries
   // Unit of Work implementation
   // Async operations throughout
   ```

6. QUERY_OPTIMIZATION:
   ```csharp
   // Efficient LINQ queries
   // Projection to DTOs
   // Pagination implementation
   // Include strategies for related data
   ```

7. DATA_ACCESS_SERVICES:
   ```csharp
   // Business-specific data services
   // Caching integration
   // Bulk operations for performance
   // Transaction management
   ```

8. PERFORMANCE_MONITORING:
   ```csharp
   // Query execution logging
   // Performance counters
   // Database health checks
   // Connection pool monitoring
   ```

Generate production-ready data access layer with optimal performance, proper error handling, and scalability considerations.
```
