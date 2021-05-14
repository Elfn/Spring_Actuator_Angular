import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {EmployeeListComponent} from '../employee-list/employee-list.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  employee: Employee;
  constructor(private employeeService: EmployeeService, private openModalService: ModalService, public emplistcmp: EmployeeListComponent) { }

  ngOnInit(): void {
  }

  public onOpenModal(employee: Employee, mode: string): void
  {
    this.openModalService.onOpenModal(employee, mode);
  }


  onAddEmloyee(addForm: NgForm): void {
    location.reload();
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value)
        .subscribe(
          (res: Employee) => {
            console.log(res);
            addForm.reset();
          },
          (err: HttpErrorResponse) => {
            alert(err.message);
          }
        );
  }


  onSearch(event: any): void {
    console.log(event);
    this.emplistcmp.onSearchEmployee(event);
  }
}
