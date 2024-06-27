import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministrationService } from '../../../services/administration.service';
@Component({
  selector: 'app-add-administration',
  templateUrl: './add-administration.component.html',
  styleUrls: ['./add-administration.component.css'],
})
export class AddAdministrationComponent implements OnInit {
  administrationForm: FormGroup;
  errorMessage: string;
  msSuccess: string;
  title = [
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabes',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kebili',
    'La Manouba',
    'Le Kef',
    'Mahdia',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];

  constructor(
    private administrationService: AdministrationService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.init();
  }

  init() {
    this.administrationForm = this.fb.group({
      code: ['', Validators.required],
      title: ['', Validators.required],
      libelle: ['', Validators.required],
    });
  }

  addAdministration() {
    this.administrationService
      .addAdministration(this.administrationForm.value)
      .subscribe(
        (data) => {
          this.administrationForm.reset();
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
