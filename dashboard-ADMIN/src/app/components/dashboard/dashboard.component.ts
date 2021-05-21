import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {SystemCPU} from '../../interfaces/system-cpu';
import {SystemHealth} from '../../interfaces/system-health';
import {AdminDashboardService} from '../../services/admin-dashboard.service';
import {HttpErrorResponse} from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//https://mdbootstrap.com/docs/angular/getting-started/quick-start/



  currentDate = Date.now();
  public traceList: any[] = [];
  public selectedTrace: any;
  public systemHealth: SystemHealth;
  public systemCPU: SystemCPU;
  public processUpTime: string;
  public http200Traces: any[] = [];
  public http404Traces: any[] = [];
  public http400Traces: any[] = [];
  public http500Traces: any[] = [];
  public httpDefaultTraces: any[] = [];
  constructor(private dashService: AdminDashboardService) {
  }
  ngOnInit(): void {
    this.getTraces();
    console.log('LLLLL ', this.http200Traces.length);
  }





  private getTraces(): void {

    this.dashService.getHttpTraces().subscribe(
      (res) => {
        console.log(res.traces);
        this.traceList = res.traces;
        this.processTrace(this.traceList);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );

  }


  private formatDate(date: Date): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const year = date.getFullYear();
    if (dd < 10) {
      const day = `0${dd}`;
    }
    if (mm < 10) {
      const month = `0${mm}`;
    }
    return `${mm}/${dd}/${year}`;
  }




  private processTrace(traces: any[]): void {
    traces.forEach((res) => {
      switch (res.response.status) {
        case 200: {
          this.http200Traces.push(res);
          break;
        }
        case 404: {
          this.http404Traces.push(res);
          break;
        }
        case 400: {
          this.http400Traces.push(res);
          break;
        }
        case 500: {
          this.http500Traces.push(res);
          break;
        }
        default: {
          this.httpDefaultTraces.push(res);
          break;
        }
      }
    });
  }

  public onEmptyArrays(): void {
    this.http200Traces = [];
    this.http404Traces = [];
    this.http400Traces = [];
    this.http500Traces = [];
    this.httpDefaultTraces = [];
  }

  onSelectTrace(trace: any): void {
    // document.getElementById('details-modal-btn').click();
    this.selectedTrace = (trace) ? trace : null;
  }
}
