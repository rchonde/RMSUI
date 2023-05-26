import { OnlineExamServiceService } from "../../Services/online-exam-service.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule, BsDatepickerModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
 
import { ModalModule } from 'ngx-bootstrap/modal';

import { RouterModule } from "@angular/router";
import { reportRoutes } from "./report.routing";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PODReportComponent } from "./PODReport/PODReport.component";

import { InwardreportComponent } from "./Inwardreport/Inwardreport.component";




import { LogsComponent } from "./logs/logs.component";
import { FilestatusComponent } from "./Filestatus/Filestatus.component";

import { PODDetailsReportComponent } from "./PODDetailsReport/PODDetailsReport.component";
import { TableModule } from 'primeng/table';
import { LocationbarcodeComponent } from "./locationbarcode/locationbarcode.component";



@NgModule({
  declarations: [LocationbarcodeComponent,PODReportComponent,LogsComponent,FilestatusComponent,InwardreportComponent,PODDetailsReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(reportRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
 
    TableModule
  ]
})
export class ReportModule {}
