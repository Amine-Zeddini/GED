import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/services/administration.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import _ from 'lodash';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-administration',
  templateUrl: './list-administration.component.html',
  styleUrls: ['./list-administration.component.css'],
})
export class ListAdministrationComponent implements OnInit {
  socket: any;
  administrations = [];
  administration: any;
  administrationsPerPage = [];
  administrationsToShow = [];
  search: string;
  currentPage = 1;
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

    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.init();
    this.GetAdministrations();

    this.socket.on('refreshPage', () => {
      this.GetAdministrations();
    });
  }

  init() {
    this.administrationForm = this.fb.group({
      code: ['', Validators.required],
      title: ['', Validators.required],
      libelle: ['', Validators.required],
    });
  }

  onEdit(administration) {
    console.log('administration', administration);
    this.administration = administration;
    this.administrationForm = this.fb.group({
      code: [administration.code, Validators.required],
      title: [administration.title, Validators.required],
      libelle: [administration.libelle, Validators.required],
    });
  }

  GetAdministrations() {
    this.administrationService.getAdministrations().subscribe((data) => {
      console.log('administrations', data);
      this.administrations = data.administrations;
      this.administrationsPerPage = this.administrations.slice(0, 5);
      this.administrationsToShow = this.administrations;
    });
  }

  editAdministration(administration) {
    console.log('editadministration', this.administrationForm);
    console.log('administration', administration);
    this.administrationService
      .editAdministration(administration._id, this.administrationForm.value)
      .subscribe(
        (data) => {
          this.msSuccess = 'updated successfully';
          this.socket.emit('refresh', {});

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

  searchAdministrations() {
    this.administrationsToShow = this.administrations;
    this.administrationsToShow = this.administrationsToShow.filter(
      (administration) =>
        administration.title.toLowerCase().search(this.search) !== -1 ||
        administration.code.toLowerCase().search(this.search) !== -1
    );
    this.pageChanged({
      page: 1,
      itemsPerPage: 5,
    });
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.administrationsPerPage = this.administrationsToShow.slice(
      startItem,
      endItem
    );
  }

  openModalDelete(administration) {
    this.administration = administration;
  }
  DeleteAdministration(administration) {
    console.log(administration.title);
    this.administrationService
      .deleteAdministration(administration._id)
      .subscribe(
        (data) => {
          this.socket.emit('refresh', {});
        },
        (err) => console.log(err)
      );
  }

  resetForm() {
    this.administrationForm.reset();
  }
}
