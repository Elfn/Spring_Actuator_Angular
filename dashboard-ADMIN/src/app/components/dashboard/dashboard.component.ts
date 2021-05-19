import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {SystemCPU} from '../../interfaces/system-cpu';
import {SystemHealth} from '../../interfaces/system-health';
import {AdminDashboardService} from '../../services/admin-dashboard.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  private processTrace(traces: any[]): void{
    traces.forEach( (res) => {
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

  onSelectTrace(trace: any): void {
    // document.getElementById('details-modal-btn').click();
    this.selectedTrace = (trace) ? trace : null;
  }
}
