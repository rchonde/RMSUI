import { OnlineExamServiceService } from "../../Services/online-exam-service.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
 
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from "@angular/router";
import { uploadRoutes } from "./upload.routing";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 
import { DataUploadComponent } from './dataupload/dataupload.component';
//import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import {FileUploadModule} from 'primeng/fileupload'; 

import { UploadinwarddataComponent } from "./Uploadinwarddata/Uploadinwarddata.component";
 
import { RetrivalInwardDataComponent } from "./RetrivalInwardData/RetrivalInwardData.component";
  

//sftpuploadForm


//import { DepartmentComponent } from "./department/department.component";

@NgModule({
  declarations: [DataUploadComponent,UploadinwarddataComponent,RetrivalInwardDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(uploadRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
     
    FileUploadModule
  ]
})
export class UploadModule {}
