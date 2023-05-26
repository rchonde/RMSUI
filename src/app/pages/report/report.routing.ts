import { Routes } from "@angular/router";
import { PODReportComponent } from "./PODReport/PODReport.component";
import { LogsComponent } from "./logs/logs.component";
import { InwardreportComponent } from "./Inwardreport/Inwardreport.component";
 
import { PODDetailsReportComponent } from "./PODDetailsReport/PODDetailsReport.component";
import { LocationbarcodeComponent } from "./locationbarcode/locationbarcode.component";

export const reportRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "PODReport",
        component: PODReportComponent
      },    
      {
        path: "logs",
        component: LogsComponent
      },
      {
        path: "Inwardreport",
        component: InwardreportComponent
      },   
      {
        path: "PODDetailsReport",
        component: PODDetailsReportComponent
      },
      {
        path: "Locationbarcode",
        component: LocationbarcodeComponent
      },    
      
    ]

  }
];
