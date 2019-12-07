import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
//https://stackblitz.com/angular/yoendngnlgg?file=src%2Fapp%2Fsidenav-responsive-example.ts
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private authService: AuthService,
      private router: Router,
     ){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  } 

}
