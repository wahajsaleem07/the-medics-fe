import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menuSidenavOpened: boolean;
  currentUser: User;

  constructor(    
    private router: Router,
    private authenticationService: AuthenticationService) { 

  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }

}
