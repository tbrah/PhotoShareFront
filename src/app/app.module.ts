import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RegisterService } from './register.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'login/emailValid/:state', component: LoginComponent},
  { path: 'login/resetSent', component: LoginComponent},
  { path: 'login', component: LoginComponent, children: [
    { path: 'register', component: RegisterComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'resetPassword/:id/:token', component: PasswordResetComponent},
  ]},
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
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
    AuthGuardService,
    AuthService,
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
