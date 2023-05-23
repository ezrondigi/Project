import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { UsersModel } from '../users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password = "";
  email = "";
  userData !: any;
  nname = "";
  isModalForgot:boolean = false;
  loading = false;
  surname = "";
  constructor(private api: ApiService, private router: Router){}
  
  emailInput(value:string){
    this.email = value.toLowerCase();
  }

  passInput(value:string){
    this.password = value;
  }

  surnameInput(value:string){
    this.surname = value;
  }

  userLogin(){
    this.loading = true;
    this.api.getUser(this.email).subscribe(res=>{
      this.userData = res;

      if(this.userData.length!=0){
        if(this.userData.password === this.password){
          if(this.userData.disabled === 0){
            window.location.reload();
            this.api.login(this.userData);
            this.router.navigate([""]);
          }else{
            alert("sorry man, you've been blocked");
          }
          
        }else{
          alert("User email or password incorrect");
        }
        
      }else{
        alert("User email or password incorrect");
      }
      
    },err=>{
      alert("it seems our server is offline");
    })
    this.loading = false;
}

toggleForget(){
  this.isModalForgot = !this.isModalForgot;
}

setPassword(){
  this.toggleForget();
  this.api.getUser(this.email).subscribe(res=>{
    let user: UsersModel;
    user = res[0];
    if(user.surname == this.surname){
      let id :number;
      id = +user.id; 
      user.password = this.password;
      this.api.updateUser(id,user).subscribe(res=>{
        alert("password updated");
      })
  }else{
    alert("update not successfullly");
  }
  },err=>{
    alert("update not successful")
  });
}

}
