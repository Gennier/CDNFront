import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { AdminComponent } from './admin.component';
import { OverviewComponent } from './overview/overview.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'overview', component: OverviewComponent},
      { path: 'user', component: UsermanagementComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }
