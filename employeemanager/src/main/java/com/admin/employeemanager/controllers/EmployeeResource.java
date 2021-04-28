package com.admin.employeemanager.controllers;

import com.admin.employeemanager.dao.EmployeeRepo;
import com.admin.employeemanager.exceptions.UserNotFoundException;
import com.admin.employeemanager.models.Employee;
import com.admin.employeemanager.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {

    @Autowired
    private EmployeeService empService;

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees ()
    {
        List<Employee> employees = empService.allEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById (@PathVariable("id") Long id) throws UserNotFoundException {
        Employee employee = empService.findEmployee(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee emp)
    {
        Employee newEmployee = empService.addEmployee(emp);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee emp)
    {
        Employee updatedEmployee = empService.updateEmployee(emp);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id)
    {
        empService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
