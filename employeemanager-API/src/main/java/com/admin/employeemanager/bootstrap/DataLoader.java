package com.admin.employeemanager.bootstrap;

import com.admin.employeemanager.models.Employee;
import com.admin.employeemanager.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DataLoader  implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private EmployeeService employeeService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

        this.load();

    }

    public void load(){
        Employee e1 = new Employee(null,"Daniel Samuels","jd@getarrays.com","Designer UX/UI","12458962","https://bootdey.com/img/Content/avatar/avatar1.png",null);
        Employee e2 = new Employee(null,"Melissa Jones","mj@getarrays.com","Senior Analyst","45123685","https://bootdey.com/img/Content/avatar/avatar3.png",null);
        Employee e3 = new Employee(null,"Tiger Scott","ts@getarrays.com","Lead Analyst","99651234","https://bootdey.com/img/Content/avatar/avatar2.png",null);

        employeeService.addEmployee(e1);
        employeeService.addEmployee(e2);
        employeeService.addEmployee(e3);
    }
}
