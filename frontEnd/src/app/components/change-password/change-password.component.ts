import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  errorMessage: string;
  msSuccess: string;
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.Init();
  }

  Init() {
    this.passwordForm = this.fb.group(
      {
        cpassword: ['', Validators.required],
        newPassword: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },
      {
        validators: [this.Validate('newPassword', 'confirmPassword')],
      }
    );
  }

  ChangePassword() {
    this.usersService.ChangePassword(this.passwordForm.value).subscribe(
      (data) => {
        console.log('data', data);
        this.passwordForm.reset();
        this.msSuccess = 'changed successfully';
        setTimeout(() => {
          this.msSuccess = '';
        }, 2000);
        this.errorMessage = '';
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

  Validate(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const new_password = formGroup.controls[newPassword];
      const confirm_password = formGroup.controls[confirmPassword];

      if (confirm_password.errors && !confirm_password.errors.mustMatch) {
        return;
      }
      if (confirm_password.value !== new_password.value) {
        confirm_password.setErrors({ mustMatch: true });
      } else {
        confirm_password.setErrors(null);
      }
    };
  }
}
