import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pharma-retail';

  constructor(private router: Router) {

    const user: any = localStorage.getItem('currentUser');
    if(!user){
      this.router.navigate(["login"])
    }
  }
}
