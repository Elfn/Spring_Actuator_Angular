import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AdminDashboardService} from '../../services/admin-dashboard.service';
import {SystemCPU} from '../../interfaces/system-cpu';
import {SystemHealth} from '../../interfaces/system-health';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public systemCPU: SystemCPU;
  public systemHealth: SystemHealth;
  public processUpTime: any;
  public systemHealthDiskSpace: any;

  constructor(private dashService: AdminDashboardService) { }

  ngOnInit(): void {
    this.getSystemCPU();
    this.getSystemHealth();
    this.getProcessUpTime();
  }

  private getSystemCPU(): void {

    this.dashService.getSystemCPU().subscribe(
      (res) => {
        console.log('CPU ', res);
        this.systemCPU = res;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );

  }

  private getSystemHealth(): void {

    this.dashService.getSystemHealth().subscribe(
      (res) => {
        console.log('HEALTH ', res);
        this.systemHealth = res;
        this.systemHealthDiskSpace = this.niceBytes(res.components.diskSpace.details.free);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );

  }


  private getProcessUpTime(): void {

    this.dashService.getProcessUpTime().subscribe(
      (res) => {
        console.log('UP TIME ', res);
        this.processUpTime = this.formateUptime(Math.round(res.measurements[0].value));
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );

  }

  private formateUptime(timestamp: number): string {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - (hours * 60);
    const seconds = timestamp % 60;
    return hours.toString().padStart(2, '0') + 'h' +
      minutes.toString().padStart(2, '0') + 'm' + seconds.toString().padStart(2, '0') + 's';
  }

  private niceBytes(x): any{
    let l = 0;
    let n = parseInt(x, 10) || 0;
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    while (n >= 1024 && ++l){
      n = n / 1024;
    }
    // include a decimal point and a tenths-place digit if presenting
    // less than ten of KB or greater units
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

}
