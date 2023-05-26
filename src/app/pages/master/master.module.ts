import { OnlineExamServiceService } from "../../Services/online-exam-service.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
 
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from "@angular/router";''
import { DepartmentRoutes } from "./master.routing";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationmasterComponent } from "./locationmaster/locationmaster.component";
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [LocationmasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(), 
    TableModule
  ]
})
export class MasterModule {}
