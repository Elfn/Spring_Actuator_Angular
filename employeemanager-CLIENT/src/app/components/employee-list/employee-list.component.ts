import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  // ----------------Variables--------------------------
    public employees: Employee[];
  // ---------------------------------------------------
  isFound: boolean;

  constructor(private employeeService: EmployeeService, public openModalService: ModalService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.isFound = false;
    this.employeeService.getEmployees().subscribe(
       (res: Employee[]) => {
           this.isFound = true;
           this.employees = res;
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }


  onUpdateEmployee(employee: Employee): void {
    document.getElementById('update-employee-form').click();
    setTimeout(() => location.reload(), 1000);
    this.employeeService.updateEmployee(employee)
      .subscribe(
        (res: Employee) => {
          console.log(res);
          this.getEmployees();
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        }
      );
  }

  onDeleteEmployee(employeeId): void {
    document.getElementById('delete-employee-form').click();
    setTimeout(() => location.reload(), 1000);
    this.employeeService.deleteEmployee(employeeId)
      .subscribe(
        (res: void) => {
          console.log(res);
          this.getEmployees();
          },
        (err: HttpErrorResponse) => {
          alert(err.message);
        }
      );
  }

  onSearchEmployee(keyword: string): void {

    const results: Employee[] = [];
    for (const employee of this.employees){
      // If the keyword is contained into name, email, jobtitle etc...
      if (employee.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || employee.email.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || employee.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || employee.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
          results.push(employee);
      }
    }

    this.employees = results;
    if (results.length === 0 || !keyword){
      this.getEmployees();
    }

  }


  public onOpenModal(employee: Employee, mode: string): void
 {
   this.openModalService.onOpenModal(employee, mode);
 }

}
