import { Injectable } from '@angular/core';
import {Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
   editedEmployee: Employee;
   deletedEmployee: Employee;

  constructor() { }

  public onOpenModal(employee: Employee, mode: string): void
  {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#modalAdd');

    }
    if (mode === 'edit'){
      this.editedEmployee = employee;
      button.setAttribute('data-target', '#modalEdit');

    }
    if (mode === 'delete'){
      this.deletedEmployee = employee;
      button.setAttribute('data-target', '#modalDelete');

    }

    container.appendChild(button);
    button.click();
  }
}
