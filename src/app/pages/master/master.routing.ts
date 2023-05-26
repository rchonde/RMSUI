import { Routes } from "@angular/router";


import { LocationmasterComponent } from "./locationmaster/locationmaster.component";

export const DepartmentRoutes: Routes = [
  {
    path: "",
    children: [

      {
        path: "Locationmaster",
        component: LocationmasterComponent
      }

      
    ]
  }
];
