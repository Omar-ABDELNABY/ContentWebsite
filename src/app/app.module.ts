import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSpinner } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
	{
		path: '**',
		redirectTo: '/home',
	},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MainModule,
    AdminModule,
    
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ MatSpinner ],
})
export class AppModule { }
