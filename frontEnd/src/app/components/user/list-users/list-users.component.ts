import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import _ from 'lodash';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  socket: any;
  users = [];
  user: any;
  usersPerPage = [];
  usersToShow = [];
  search: string;
  currentPage = 1;
  loggedInUser: any;
  userArr = [];
  userForm: FormGroup;
  errorMessage: string;
  msSuccess: string;
  role = ['Administrateur', 'Gestionnaire', "Agent d'acquisition"];

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,

    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.init();
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUsers();
      this.GetUser();
    });
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

  onEdit(user) {
    console.log('user', user);
    this.user = user;
    this.userForm = this.fb.group({
      username: [user.username, Validators.required],
      name: [user.name, Validators.required],
      lastName: [user.lastName, Validators.required],

      email: [user.email, [Validators.email, Validators.required]],
      password: ['', Validators.required],
      role: [user.role, Validators.required],
    });
  }

  GetUsers() {
    this.usersService.GetAllUsers().subscribe((data) => {
      console.log('users', data);
      this.users = data.result;
      this.usersPerPage = this.users.slice(0, 5);
      this.usersToShow = this.users;
    });
  }

  editUser(user) {
    console.log('editUser', this.userForm);
    console.log('user', user);
    this.usersService.updateUserById(user._id, this.userForm.value).subscribe(
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

  searchUsers() {
    this.usersToShow = this.users;
    this.usersToShow = this.usersToShow.filter(
      (user) =>
        user.username.toLowerCase().search(this.search) !== -1 ||
        user.email.toLowerCase().search(this.search) !== -1
    );
    this.pageChanged({
      page: 1,
      itemsPerPage: 5,
    });
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.usersPerPage = this.usersToShow.slice(startItem, endItem);
  }

  GetUser() {
    this.usersService.GetUserById(this.loggedInUser._id).subscribe((data) => {
      this.userArr = data.result.following;
    });
  }

  openModalDelete(user) {
    this.user = user;
  }
  DeleteUser(user) {
    console.log(user.username);
    this.usersService.DeleteUser(user._id).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  resetForm() {
    this.userForm.reset();
  }
}
