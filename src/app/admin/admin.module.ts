import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import { MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from '../common/guards/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../common/interceptor/auth-interceptor';
import { HomeControlComponent } from './home-control/home-control.component';
import { AboutControlComponent } from './about-control/about-control.component';
import { ListComponent } from './home-control/list/list.component';
import { HomeService } from '../common/services/home.service';
import { SharedModule } from '../common/shared.module';
import { EditSectionComponent } from './shared/edit-section/edit-section.component';
// import { CKEditorModule } from 'ckeditor4-angular';
import {NgxWigModule} from 'ngx-wig';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';

const routes: Routes = [
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [
    {path: '', redirectTo: 'homecontrol', pathMatch: 'full'},
    {path: 'homecontrol', component: HomeControlComponent, resolve: {data: HomeService}},
    {path: 'aboutcontrol', component: AboutControlComponent},
  ]},
];

@NgModule({
  entryComponents:[
    EditSectionComponent,
    ConfirmDeleteComponent,
  ],
  declarations: [
    AdminComponent,
    LoginComponent,
    HomeControlComponent,
    AboutControlComponent,
    ListComponent,
    EditSectionComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
    ReactiveFormsModule,
        
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    // CKEditorModule,
    NgxWigModule,
  ],
  providers: [
    HomeService,
    {   
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AdminModule { }
