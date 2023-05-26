import { OnlineExamServiceService } from "../../Services/online-exam-service.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
 
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableModule } from 'primeng/table';
import { RouterModule } from "@angular/router";
import { DepartmentRoutes } from "./process.routing";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { outwardFileComponent } from './outwardFile/outwardFile.component';
 
import { RefillingComponent } from './Refilling/Refilling.component';
 


 
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { InwardComponent } from './inward/inward.component';
import { ValidateComponent } from './validate/validate.component';
import { ReverificationComponent } from './reverification/reverification.component';
import { PODEntryComponent } from './PODEntry/PODEntry.component';
import { ApporvalComponent } from './Apporval/Apporval.component';
import { DataentryComponent } from './Dataentry/Dataentry.component';
 
import { ScanningComponent } from './Scanning/Scanning.component';
 
import { OutwardComponent } from './Outward/Outward.component';
 
import { QCComponent } from './QC/QC.component';



import { PODvalidateComponent } from './PODvalidate/PODvalidate.component';
import { PODdetailsentryComponent } from './PODdetailsentry/PODdetailsentry.component';






//import { DataviewComponent } from './dataview/dataview.component';

@NgModule({
  declarations: [PODdetailsentryComponent,RefillingComponent,outwardFileComponent,QCComponent,InwardComponent,ValidateComponent,ScanningComponent,OutwardComponent,ApporvalComponent,PODEntryComponent,ReverificationComponent,PODvalidateComponent,DataentryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
 
    TableModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ProcessModule {}
