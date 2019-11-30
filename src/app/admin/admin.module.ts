import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import { MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from '../common/guards/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../common/interceptor/auth-interceptor';


const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path: 'admin/login', component: LoginComponent},
];

@NgModule({
  declarations: [AdminComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
        
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers: [
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
