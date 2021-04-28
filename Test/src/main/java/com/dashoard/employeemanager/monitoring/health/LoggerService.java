package com.dashoard.employeemanager.monitoring.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class LoggerService implements HealthIndicator {
    private final String LOGGER_SERVICE = "loggerService";

    @Override
    public Health health() {
        return (isLoggerServiceData()) ? Health.up().withDetail(LOGGER_SERVICE, "Service is running").build() : Health.down().withDetail(LOGGER_SERVICE, "Service is not available").build();
    }

    private boolean isLoggerServiceData(){
        return false;
    }

}
