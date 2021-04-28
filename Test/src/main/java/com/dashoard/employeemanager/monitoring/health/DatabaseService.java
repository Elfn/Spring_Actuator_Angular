package com.dashoard.employeemanager.monitoring.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class DatabaseService implements HealthIndicator {
    private final String DATABASE_SERVICE = "DatabaseService";

    @Override
    public Health health() {
        return (isHealthData()) ? Health.up().withDetail(DATABASE_SERVICE, "Service is running").build() : Health.down().withDetail(DATABASE_SERVICE, "Service is not available").build();
    }

    private boolean isHealthData(){
        return true;
    }
}
