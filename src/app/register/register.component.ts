import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router} from '@angular/router';
import { UsersModel } from '../users.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  password = "";
  email = "";
  name = "";
  surname = "";
  userModel : UsersModel = new UsersModel();
  userData !: any;

  constructor(private api: ApiService, private router: Router){}
  


  emailInput(value:string){
    this.email = value.toLowerCase();
  }

  passInput(value:string){
    this.password = value;
  }

  nameInput(value:string){
    this.name = value;
  }

  surnameInput(value:string){
    this.surname = value;
  }

  postUser(){
    this.api.getUser(this.email).subscribe(res =>{
      if(res.length != 0){
        this.post();
      }else{
       alert("email already exists")
     }
    })

   
  }

  post(){
   
    this.userModel.name = this.name;
    this.userModel.surname = this.surname;
    this.userModel.email = this.email;
    this.userModel.password = this.password.toLowerCase();
    this.userModel.state = 1;
    this.userModel.disabled = 0;

     this.api.postUser(this.userModel).subscribe(res=>{
       alert("User registered");
       this.router.navigate(["login"]);
     },
     err=>{
       alert("neh it's not working right");
     })
 
  }

  getAllUsers(){
    this.api.getUsers().subscribe(res=>{
        this.userData = res;
    })
  }
}
