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
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { EuropebetPostsComponent } from './components/europebet-posts/europebet-posts.component';
import { AnalyticalPostsComponent } from './components/analytical-posts/analytical-posts.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: 'posts/analytics', title: "epop plus - სპორტული ანალიტიკა", component: AnalyticalPostsComponent },
  { path: 'posts/powered-by-europebet', title: "Powered by Europebet - Europop", component: EuropebetPostsComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'auth/login', title: "Login - Europop", component: LoginComponent },
  { path: 'auth/register', title: "Register - Europop", component: RegisterComponent },
  { path: 'auth/password-recovery', title: "Recover password - Europop", component: PasswordRecoveryComponent },
  { path: 'about-us', title: "ჩვენ შესახებ - Europop", component: AboutUsComponent },
  { path: 'privacy-policy', title: "Privacy Policy - Europop", component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', title: "Terms and Conditions - Europop", component: TermsAndConditionsComponent},
  { path: "**", title: "404 - Not Found", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
