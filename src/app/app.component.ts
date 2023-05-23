import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Project';

  constructor(private authService: ApiService){}

  id:number = 0;
  state:number = 0;

  ngOnInit(): void {
    this.authService.setSession();
    this.id = this.authService.id;
    this.state = this.authService.state;
  }

  logout(){
    window.location.reload();
    this.authService.logout();
  }
  loggedin(){
    
    return this.authService.loggedIn;
  }
  
}
