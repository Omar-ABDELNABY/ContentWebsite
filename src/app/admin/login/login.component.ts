import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public invalidLogin: boolean = false;
  public  loginFormGroup: FormGroup;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
			password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }


  login() {
    if (this.loginFormGroup.valid) {
      this.authService.Login(this.loginFormGroup.value).subscribe(resp => {
        console.log(resp);
        if(resp){
          localStorage.setItem('token', resp.toString());
          this.router.navigate(['/admin']);
        }
        else{
          this.invalidLogin = true;
        }
      });
    }
  }  
}
