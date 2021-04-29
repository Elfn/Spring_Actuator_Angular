import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  // ----------------Variables--------------------------
    public employees: Employee[];
  // ---------------------------------------------------

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
     this.employeeService.getEmployees().subscribe(
       (res: Employee[]) => {
         this.employees = res;
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }


}