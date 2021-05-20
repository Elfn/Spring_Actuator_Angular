import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {SystemHealth} from '../interfaces/system-health';
import {SystemCPU} from '../interfaces/system-cpu';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  readonly SERVER_URL =  environment.serverUrl;
  public http200Traces: any[] = [];
  public http404Traces: any[] = [];
  public http400Traces: any[] = [];
  public http500Traces: any[] = [];
  public httpDefaultTraces: any[] = [];
  private traceList: any;


  constructor(private http: HttpClient) { }

  // We use obserable because the execution will take some time
  // as we are making call to the network, so informations are coming from internet
  // So observable will let us know when that execution will be done
  public getHttpTraces(): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/httptrace`);
  }

  public getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.SERVER_URL}/health`);
  }

  public getSystemCPU(): Observable<SystemCPU> {
    return this.http.get<SystemCPU>(`${this.SERVER_URL}/metrics/system.cpu.count`);
  }

  public getProcessUpTime(): Observable<SystemCPU> {
    return this.http.get<SystemCPU>(`${this.SERVER_URL}/metrics/process.uptime`);
  }



}
