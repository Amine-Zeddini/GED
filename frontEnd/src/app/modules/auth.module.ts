import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
