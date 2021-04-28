package com.admin.employeemanager.dao;

import com.admin.employeemanager.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
}
