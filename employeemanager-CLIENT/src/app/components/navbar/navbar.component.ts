import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  employee: Employee;
  constructor(private employeeService: EmployeeService, private openModalService: ModalService) { }

  ngOnInit(): void {
  }

  public onOpenModal(employee: Employee, mode: string): void
  {
    this.openModalService.onOpenModal(employee, mode);
  }


}
