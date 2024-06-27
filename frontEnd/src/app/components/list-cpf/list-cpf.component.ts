import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import _ from 'lodash';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-cpf',
  templateUrl: './list-cpf.component.html',
  styleUrls: ['./list-cpf.component.css'],
})
export class ListCpfComponent implements OnInit {
  socket: any;
  users = [];
  usersPerPage = [];
  usersToShow = [];
  search: string;
  currentPage = 1;
  loggedInUser: any;
  userArr = [];

  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUsers();
      this.GetUser();
    });
  }

  GetUsers() {
    this.usersService.GetAllUsers().subscribe((data) => {
      console.log('users', data);
      _.remove(data.result, { role: 'admin' });
      this.users = data.result;
      this.usersPerPage = this.users.slice(0, 5);
      this.usersToShow = this.users;
    });
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

  DeleteUser(user) {
    console.log(user.username);
    this.usersService.DeleteUser(user._id).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }
}
