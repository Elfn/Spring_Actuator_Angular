import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/employee';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly API_URL =  environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // GET REQUEST TO API
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.API_URL}/all`);
  }

  // POST REQUEST TO API
  public addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.API_URL}/add`, employee);
  }

  // PUT REQUEST TO API
  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.API_URL}/update`, employee);
  }

  // DELETE REQUEST TO API
  public deleteEmployee(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/delete/${employeeId}`);
  }
}
