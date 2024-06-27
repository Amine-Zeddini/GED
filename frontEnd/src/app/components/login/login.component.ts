import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        this.tokenService.SetToken(data.token);
        console.log('login', data);
        this.loginForm.reset();
        this.user = this.tokenService.GetPayload();
        //If login is successful then redirect to the streams page
        // if(this.user.role === "member"){
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 1000);

        // } else {
        //   console.log('fail')
        //   this.router.navigate(['notAllowed']);
        // }
      },
      (err) => {
        this.showSpinner = false;

        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
