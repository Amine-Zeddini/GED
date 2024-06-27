import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;
  imageId: any;
  imageVersion: any;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private usersService: UsersService,
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user._id).subscribe(
      (data) => {
        // console.log(data.result.picId);
        this.imageId = data.result.picId;
        this.imageVersion = data.result.picVersion;
        // this.imageVersion = '1602591277';
        // this.imageId = "default-men_l2to0e.png"
      },
      (err) => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }
}
