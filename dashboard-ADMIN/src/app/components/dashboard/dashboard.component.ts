import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {SystemCPU} from '../../interfaces/system-cpu';
import {SystemHealth} from '../../interfaces/system-health';
import {AdminDashboardService} from '../../services/admin-dashboard.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ThemeOption} from 'ngx-echarts';
import {CoolTheme} from '../../model/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
// https://mdbootstrap.com/docs/angular/getting-started/quick-start/
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
  initOpts: any;
  options: any;
  theme: string | ThemeOption;
   coolTheme: any;
   options2: any;
  data: any = [];
  totalRecords: number;
  page = 1;



  constructor(private dashService: AdminDashboardService) {
  }
  ngOnInit(): void {
    this.getTraces();
    console.log('LLLLL ', this.http200Traces.length);
    this.initializeBarChart();
    this.initializeCircleChart();

  }



  private initializeBarChart(): void{
    this.initOpts = {
      renderer: 'svg',
      width: 550,
      height: 300
    };

    this.options = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['200', '404', '400', '500'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'Counters',
        type: 'bar',
        barWidth: '60%',
        data: [this.http200Traces.length, this.http404Traces.length, this.http400Traces.length, this.http500Traces.length]
      }]
    };
  }
  private initializeCircleChart(): void{

    this.coolTheme = CoolTheme;
    this.options2 = {
      title: {
        text: 'HTTP REQUESTS',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['404', '200', '400', '500']
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 100],
          roseType: 'area',
          data: [
            { value: this.http404Traces.length, name: '404' },
            { value: this.http200Traces.length, name: '200' },
            { value: this.http400Traces.length, name: '400' },
            { value: this.http500Traces.length, name: '500' },
          ]
        }
      ]
    };
  }


  private getTraces(): void {

    this.dashService.getHttpTraces().subscribe(
      (res) => {
        console.log(res.traces);
        this.traceList = res.traces;
        this.totalRecords = this.traceList.length;
        this.processTrace(this.traceList);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );

  }

  pageChanged(nb): void {
    this.page = nb;
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
