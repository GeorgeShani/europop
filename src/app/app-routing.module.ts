import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: 'auth/login', title: "Login - europop", component: LoginComponent },
  { path: 'auth/register', title: "Register - europop", component: RegisterComponent },
  { path: 'auth/password-recovery', title: "Recover password - europop", component: PasswordRecoveryComponent },
  { path: 'privacy-policy', title: "Privacy Policy - europop", component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', title: "Terms and Conditions - europop", component: TermsAndConditionsComponent},
  { path: "**", title: "404 - Not Found", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
