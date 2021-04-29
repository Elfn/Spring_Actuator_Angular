package com.admin.employeemanager.services;

import com.admin.employeemanager.dao.EmployeeRepo;
import com.admin.employeemanager.exceptions.UserNotFoundException;
import com.admin.employeemanager.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class EmployeeService {
    @Autowired
    private EmployeeRepo empRepo;

    public Employee addEmployee(Employee emp)
    {
        emp.setEmpCode(UUID.randomUUID().toString());
        return empRepo.save(emp);
    }

    public List<Employee> allEmployees()
    {
        return empRepo.findAll();
    }

    public Employee updateEmployee(Employee emp)
    {
        return empRepo.save(emp);
    }

    public Employee findEmployee(Long id) throws UserNotFoundException {
        return empRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User with id "+id+" was not found"));
    }

    public void deleteEmployee(Long id)
    {
        empRepo.deleteById(id);
    }
}
