import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsersModel } from '../users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  constructor(private http : HttpClient) { }
  ngOnInit(): void {
    this.setSession();
  }
  
  loggedIn: boolean = false;
  id: number = 0;
  state: number = 0;

  startSession(id: number){
    sessionStorage.setItem("userId","" + id);
  }

  setSession(){
    if(sessionStorage.getItem("userId") === null){
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
      var tt = ""+sessionStorage.getItem("userId");
      this.id = +tt;
      var ss = ""+sessionStorage.getItem("state");
      this.state = +ss;
    }
  }

  login(user: UsersModel){
    this.id = user.id;
    sessionStorage.setItem("state", ""+user.state);
    this.startSession(this.id);
    this.loggedIn = true;
    this.state = user.state;
  }

  logout(){
    sessionStorage.removeItem("userID");
    sessionStorage.clear();
    this.id = 0;
    this.state = 0;
    this.loggedIn = false;
    
  }

  isAuthenticated(){
    return this.loggedIn;
  }

  postUser(data :UsersModel){
    return this.http.post<UsersModel>("http://localhost:3000/posts",data)
    .pipe(map((res:UsersModel)=>{
      return res;
    }))
  }

  getUsers(){
    return this.http.get<UsersModel[]>("http://localhost:3000/posts")
    .pipe(map((res:UsersModel[])=>{
      return res;
    }))
  }

  getUserById(id:number){
    return this.http.get<UsersModel[]>("http://localhost:3000/posts?id="+id)
    .pipe(map((res:UsersModel[])=>{
      return res[0];
    }))
  }

  getUser(email:string){
    return this.http.get<UsersModel[]>("http://localhost:3000/posts?email="+email)
    .pipe(map((res:UsersModel[])=>{
      if(res.length !=0){
        return res;
      }else{
      return [];
      }
    }))
  }

  getDisableUsers(){
    let userData : UsersModel[] = [];
    return this.http.get<UsersModel[]>("http://localhost:3000/posts")
    .pipe(map((res:UsersModel[])=>{
      for(let user of res){
        if(user.disabled == 1){
          userData.push(user);
        }
      }
      return userData;
    }))
  }

  getEnableUsers(){
    let userData : UsersModel[] = [];
    return this.http.get<UsersModel[]>("http://localhost:3000/posts")
    .pipe(map((res:UsersModel[])=>{
      for(let user of res){
        if(user.disabled == 0){
          userData.push(user);
        }
      }
      return userData;
    }))
  }

  updateUser(id: number, data :UsersModel){
    return this.http.put<UsersModel>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:UsersModel)=>{
      return res;
    }))
  }

  deleteUser(id: number){
    return this.http.delete<UsersModel>("http://localhost:3000/posts/"+id)
    .pipe(map((res:UsersModel)=>{
      return res;
    }))
  }
}
