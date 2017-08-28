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
import { PopupService } from './popup.service';
import { ProfileService } from './profile.service';
import { CommentService } from './comment.service';
import { LikeService } from './like.service';
import { DiscoverService } from './discover.service';

import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { MasterComponent } from './master/master.component';
import { NavComponent } from './master/nav/nav.component';
import { FirstLoginComponent } from './master/first-login/first-login.component';
import { ProfilePageComponent } from './master/profile-page/profile-page.component';
import { AboutMeComponent } from './master/profile-page/about-me/about-me.component';
import { ProfileImageFeedComponent } from './master/profile-page/profile-image-feed/profile-image-feed.component';
import { ProfileReferenceComponent } from './master/profile-page/profile-reference/profile-reference.component';
import { AddPostComponent } from './master/add-post/add-post.component';
import { ReversePipe } from './reverse.pipe';
import { StopPropagationDirective } from './stop-propagation.directive';
import { DiscoverComponent } from './master/discover/discover.component';
import { ColumnPipe } from './column.pipe';


const appRoutes: Routes = [

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
  { path: '', component: MasterComponent, canActivate: [AuthGuardService], children: [
    { path: 'profile/:username', component: ProfilePageComponent},
    { path: 'discover', component: DiscoverComponent},
  ]},
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
    NavComponent,
    FirstLoginComponent,
    ProfilePageComponent,
    AboutMeComponent,
    ProfileImageFeedComponent,
    ProfileReferenceComponent,
    AddPostComponent,
    ReversePipe,
    StopPropagationDirective,
    DiscoverComponent,
    ColumnPipe,
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
    PopupService,
    ProfileService,
    CommentService,
    LikeService,
    DiscoverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
