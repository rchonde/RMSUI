import { Routes } from "@angular/router";
 
import { DataUploadComponent } from "./dataupload/dataupload.component";
//import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
 
import { RetrivalInwardDataComponent } from "./RetrivalInwardData/RetrivalInwardData.component";
  

import { UploadinwarddataComponent } from "./Uploadinwarddata/Uploadinwarddata.component";
//DataUploadComponent
 
export const uploadRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "inward-upload",
       component: UploadinwarddataComponent
      },
      {
        path: "data-upload",
       component: DataUploadComponent
      },
      {
        path: "RetrivalInward",
       component: RetrivalInwardDataComponent
      },
      
    ]
  }
];
