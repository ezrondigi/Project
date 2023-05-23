import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiGuard } from './shared/api.guard';

const routes: Routes = [
{path:"login",component:LoginComponent, canActivate: [ApiGuard]},
{path:"register",component:RegisterComponent},
{path:"users",component:UsersComponent},
{path: "home",component:HomeComponent},
{path: "profile",component:ProfileComponent},
{path: "",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
