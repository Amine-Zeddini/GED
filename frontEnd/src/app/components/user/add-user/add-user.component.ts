import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  msSuccess: string;
  role = ['Administrateur', 'Gestionnaire', "Agent d'acquisition"];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.init();
  }

  init() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  addUser() {
    this.authService.registerUser(this.userForm.value).subscribe(
      (data) => {
        this.userForm.reset();
        this.msSuccess = 'created successfully';
        setTimeout(() => {
          this.msSuccess = '';
        }, 2000);
        this.errorMessage = '';
        console.log(data);
      },
      (err) => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
