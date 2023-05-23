import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { UsersModel } from '../users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  
  isModalActive : boolean = false;
  name = "";
  surname = "";
  password = "";
  userData : UsersModel = new UsersModel();

  constructor(private api: ApiService, private router: Router){}

  ngOnInit(): void {
   
   if(this.api.isAuthenticated()){
    this.sign();
  }else{
    this.router.navigate(['']);
  }
  }
  

  sign(){
    if(this.api.loggedIn){
    this.api.getUserById(this.api.id).subscribe(res=>{
      this.userData = res;
    });
    }
  }

  updateUser(){
    this.userData.name = this.name;
    this.userData.surname = this.surname;
    this.userData.password = this.password;
    this.api.updateUser(this.userData.id, this.userData).subscribe(res=>{
      
    });
    this.isModalActive = false;
  }

  toggleModalEdit() {
    this.name = this.userData.name;
    this.surname = this.userData.surname;
    this.password = this.userData.password;
    this.isModalActive = !this.isModalActive;
  }

  nameInput(value:string){
    this.name = value;
  }

  surnameInput(value:string){
    this.surname = value;
  }

  passwordInput(value:string){
    this.password = value;
  }

}
