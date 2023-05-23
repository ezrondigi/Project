import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { UsersModel } from '../users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  isModalActive : boolean = false;
  isModalActiveAdd : boolean = false;
  isDropdown : boolean = false;
  isModaldelete : boolean= false;
  userData : UsersModel[] = [];
  dropText : string = "Regular";
  name = "";
  surname = "";
  email = "";
  title = "";
  state = 2;
  userOne: UsersModel = new UsersModel;
  add: boolean = true;
  constructor(private api: ApiService, private router: Router){}


  nameInput(value:string){
    this.name = value;
  }

  surnameInput(value:string){
    this.surname = value;
  }

  emailInput(value:string){
    this.email = value;
  }

  ngOnInit():void{
    if(this.api.state == 2){
      this.activeUsers();
    }else{
      this.router.navigate(['']);
    }
  }

  getAllUsers(){
    this.api.getUsers().subscribe(res=>{
        this.userData = res;
    })
  }

  userToggleA(){
    this.add = true;
      this.activeUsers();
  }


  userToggleB(){
    this.add = false;
     this.disabledUsers();
  }

  activeUsers(){
    this.title = "Active";
    this.api.getUsers().subscribe(res=>{
    var disabled: UsersModel[] = [];
    for(let user of res){
      if(user.disabled == 0){
        disabled.push(user);
      }
    }
    this.userData = disabled;
  })
  }

  disabledUsers(){
    this.title = "Disable";
    this.api.getUsers().subscribe(res=>{
      var disabled: UsersModel[] = [];
      for(let user of res){
        if(user.disabled == 1){
          disabled.push(user);
        }
      }
      this.userData = disabled;
    })
    
  }

  disableUser(row: any){
    console.log(row);
    row.disabled = 1;
    this.api.updateUser(row.id, row).subscribe(res=>{
      this.activeUsers();
    });
  }

  activateUser(row: any){
    row.disabled = 0;
    this.api.updateUser(row.id, row).subscribe(res=>{
      alert("user back in business");
      this.disabledUsers();
    });
  }

  deleteUser(){
    this.isModaldelete = false;
    this.api.deleteUser(this.userOne.id).subscribe(res=>{
      this.disabledUsers();
      alert("user deleted");
    });
  }

  toggleModalEdit(row: any) {
    this.isDropdown = false;
    this.userOne = row;
    this.name = this.userOne.name;
    this.surname = this.userOne.surname;
    this.dropText = this.drop(row.state);
    this.isModalActive = !this.isModalActive;
  }

  toggleDrop(){
    this.isDropdown = !this.isDropdown;
  }

  toggleDelete(row:any){
    this.userOne = row;
    this.isModaldelete = !this.isModaldelete;
  }



  drop(display: number){
    this.toggleDrop();
    this.state = display;
    switch(display){
      case 1:{
        return this.dropText = "Regular";
      }case 2:{
        return this.dropText = "Admin";
      }default:{
        return "Regular";
      }
    }
  }

  toggleModalAdd() {
    this.isModalActiveAdd = !this.isModalActiveAdd;
  }

  updateUser(){
    this.userOne.name = this.name;
    this.userOne.surname = this.surname;
    this.userOne.state = this.state;
    this.api.updateUser(this.userOne.id, this.userOne).subscribe(res=>{
    });
    this.isModalActive=false;
  }

  change(value:any){
    if(value == 1){
      return "Regular";
    }else{
      return "Admin";
    }
  }


  postUser(){
    this.userOne.name = this.name;
    this.userOne.surname = this.surname;
    this.userOne.email = this.email.toLowerCase();
    this.userOne.password = "1234";
    this.userOne.disabled = 1;
    this.userOne.state = 1;

    this.api.postUser(this.userOne).subscribe(res=>{
      alert("User registered");
      
    },
    err=>{
      alert("neh it's not working right");
    })
    window.location.reload();
  }
}
