import { Component, OnInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
 import { Globalconstants } from "../../../Helper/globalconstants";
  import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
 import { FormGroup, FormBuilder, Validators } from "@angular/forms";

//import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import { Label } from 'ng2-charts';

// Themes begin
am4core.useTheme(dataviz);
am4core.useTheme(am4themes_animated);
// Themes end


import { AxisRenderer } from '@amcharts/amcharts4/charts';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"]
})



export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;

  public clicked: boolean = true;
  public clicked1: boolean = false;
  public chartFirst: any;
  public chartFirstFU: any;
  public chartActivity: any;
  public updateActivityChartInterval;


  activeRow: any;
  DashboardForm: FormGroup;   
  submitted = false;
  Reset = false;     
  sMsg: string = '';    
  _StatusList :any; 
  _LogList :any; 
  DatauploadCount:0;
  TaggingCount:0;
  FileUploadCount:0;
  UserCount:0;
  _ActivityList :any;
  activityChartData:any;
  firstChartData:any;
  firstChartDataFU:any;
  
  _UploadList:any;
  _ActivityLog:any;
  activitylogChartData:any;
  chartActivityLog:any;
  ApprovalPending:any;
  RequestPending:any;
  RefilingPending:any;
  OutCount:any;

  constructor(
     private formBuilder: FormBuilder,
     private _onlineExamService: OnlineExamServiceService,
     private _global: Globalconstants,
    private zone: NgZone
  ) { }

  ngOnInit() {

     this.DashboardForm = this.formBuilder.group({
       BranchName: ['', Validators.required],
      User_Token:localStorage.getItem('User_Token'),

      id:[0]
     });
   //  this.geBranchList();
 
   this.StatusList();
  
  }
  
  ngOnDestroy() {
    clearInterval(this.updateActivityChartInterval);
    this.zone.runOutsideAngular(() => {
      if (this.chartFirst) {
        
        
        
       
      }
    });

  }

  StatusList() {

    const apiUrl=this._global.baseAPIUrl+'Status/GetStatusCount?userID=0&user_Token='+localStorage.getItem('User_Token')
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     

 
      if(data !="")         
      {
      this.ApprovalPending = data[0].ApprovalPending;
      this.RequestPending = data[0].RequestPending;
      this.RefilingPending = data[0].RefilingPending;
      this.OutCount = data[0].OutCount;
      }
    });
  }

 
     
 

 



}
