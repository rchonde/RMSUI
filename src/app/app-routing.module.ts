import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { LoginNewComponent } from './pages/login-new/login-new.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ForgetPasswordComponent } from "./pages/forget-password/forget-password.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "Login",
    pathMatch: "full"
  },
  {
    path: "Login",
    component: LoginNewComponent
  },
  {
    path: "forgot-password",
    component: ForgetPasswordComponent
  },
  {
    path: "Forbidden",
    component: ForbiddenComponent
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboards",
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(x => x.DashboardsModule)
      },
      {
        path: "usermanagement",
        loadChildren: () => import('./pages/user-management/user-management.module').then(x => x.UserManagementModule)
      },
      {
        path: "master",
        loadChildren: () => import('./pages/master/master.module').then(x => x.MasterModule)
      },
      {
        path: "process",
        loadChildren: () => import('./pages/process/process.module').then(x => x.ProcessModule)
      },
      {
        path: "report",
        loadChildren: () => import('./pages/report/report.module').then(x => x.ReportModule)
      },
      {
        path: "upload",
        loadChildren: () => import('./pages/upload/upload.module').then(x => x.UploadModule)
      },
      {
        path: "search",
        loadChildren: () => import('./pages/search/search.module').then(x => x.SearchModule)
      },
      {
        path: "components",
        loadChildren: () => import('./pages/components/components.module').then(x => x.ComponentsModule)
      },
      {
        path: "forms",
        loadChildren: () => import('./pages/forms/forms.module').then(x => x.FormsModules)
      },
      {
        path: "tables",
        loadChildren: () => import('./pages/tables/tables.module').then(x => x.TablesModule)
      },
      {
        path: "maps",
        loadChildren: () => import('./pages/maps/maps.module').then(x => x.MapsModule)
      },
      {
        path: "widgets",
        loadChildren: () => import('./pages/widgets/widgets.module').then(x => x.WidgetsModule)
      },
      {
        path: "charts",
        loadChildren: () => import('./pages/charts/charts.module').then(x => x.ChartsModule)
      },
      {
        path: "calendar",
        loadChildren: () => import('./pages/calendar/calendar.module').then(x => x.CalendarModule)
      },
      {
        path: "examples",
        loadChildren: () => import('./pages/examples/examples.module').then(x => x.ExamplesModule)
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "examples",
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(x => x.AuthLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "Login"
  }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
