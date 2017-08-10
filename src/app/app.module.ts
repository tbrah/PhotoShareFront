import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';

import { UserService } from './user.service';
import { LoginService } from './login.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RegisterService } from './register.service';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { MasterComponent } from './master/master.component';


const appRoutes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', component: MasterComponent, canActivate: [AuthGuardService]},

  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },

  // Login paths start
  { path: 'login/emailValid/:state', component: LoginComponent},
  { path: 'login/resetSent', component: LoginComponent},
  { path: 'login', component: LoginComponent, 
    children: [
      { path: 'register', component: RegisterComponent},
      { path: 'forgotPassword', component: ForgotPasswordComponent},
      { path: 'resetPassword/:id/:token', component: PasswordResetComponent},
    ]},
  // Login paths end

  // Master paths start
  { path: '', component: MasterComponent},
  // Master paths end
  
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    MasterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    LoginService,
    AuthGuardService,
    AuthService,
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
