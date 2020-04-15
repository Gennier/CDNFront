import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbCardModule,
  NbInputModule,
  NbListModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { ChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminServices } from './admin.service';
import { AdminComponent } from './admin.component';
import { OverviewComponent } from './overview/overview.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    UsermanagementComponent,
    OverviewComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbMenuModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatExpansionModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ChartsModule,
    NbListModule,
    MatSnackBarModule
  ],
  providers: [
    AdminServices
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
