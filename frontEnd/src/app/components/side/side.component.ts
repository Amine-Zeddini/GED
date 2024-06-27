import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent implements OnInit {
  socket: any;
  user: any;
  userData: any;
  imageId: any;
  imageVersion: any;
  isCollapsed = false;

  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private router: Router
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
}
