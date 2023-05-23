import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { UsersModel } from '../users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userData !: any;
  constructor(private api: ApiService,){}
  ngOnInit(): void {
   this.sign();
  }
  
  user: UsersModel=new UsersModel;
  users: UsersModel[] = [];
  logged: boolean = false;


  sign(){
    if(this.api.loggedIn){

      this.api.getUserById(this.api.id).subscribe(res=>{
      this.user = res;
      this.logged = true;
    });

    this.api.getUsers().subscribe(res=>{
      //this.users = res;
      if(this.user.state == 1){
        for(let user of res){
          if(user.state == 1){
            this.users.push(user);
          }
        }
      }else{
        this.users = res;
      }
    })
    }else{
      this.user.name = "Stranger";
    }
  }

  name(){
      return this.user.name;
  }

  change(value:any){
    if(value == 1){
      return "Regular";
    }else{
      return "Admin";
    }
  }
  

}

