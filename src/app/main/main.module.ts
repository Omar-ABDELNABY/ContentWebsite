import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { AboutComponent } from './about/about.component';
import { HomeService } from '../common/services/home.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
  ]},
];

@NgModule({
  declarations: [HomeComponent, MainComponent, AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    CarouselModule,
    WavesModule,
    HttpClientModule,
  ],
  providers: [
    HomeService,    
  ],
})
export class MainModule { }
