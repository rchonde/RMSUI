import { Routes } from "@angular/router";
import { DataEntryComponent } from './data-entry/data-entry.component';
 
 
import { InwardComponent } from './inward/inward.component';
import { ValidateComponent } from './validate/validate.component';
import { ReverificationComponent } from './reverification/reverification.component';
import { ApporvalComponent } from './Apporval/Apporval.component';
import { PODEntryComponent } from './PODEntry/PODEntry.component';
import { DataentryComponent } from './Dataentry/Dataentry.component';
 
import { PODvalidateComponent } from './PODvalidate/PODvalidate.component';
import { PODdetailsentryComponent } from './PODdetailsentry/PODdetailsentry.component';
import { ScanningComponent } from './Scanning/Scanning.component';
import { OutwardComponent } from './Outward/Outward.component';
import { QCComponent } from './QC/QC.component';
import { outwardFileComponent } from './outwardFile/outwardFile.component';
import { RefillingComponent } from './Refilling/Refilling.component';
 

export const DepartmentRoutes: Routes = [
  {
    path: "",
    children: [
     
      
      {
        path: "Inward",
        component: InwardComponent
      }    
     
      ,
      {
        path: "Refilling",
        component: RefillingComponent
      }
      //,
      // {
      //   path: "PODEntry",
      //   component: PODEntryComponent
      // }
      ,
      // {
      //   path: "Dataentry",
      //   component: outwardFileComponent
      // },
      {
        path: "Outward",
        component: outwardFileComponent
      }
     

      
      

    ]
  }
];
