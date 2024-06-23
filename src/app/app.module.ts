import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { EuropebetPostsComponent } from './components/europebet-posts/europebet-posts.component';
import { AnalyticalPostsComponent } from './components/analytical-posts/analytical-posts.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { KFormaterPipe } from './pipes/k-formater.pipe';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    PostDetailsComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RelativeTimePipe,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    SearchResultsComponent,
    EuropebetPostsComponent,
    AnalyticalPostsComponent,
    AuthorsComponent,
    CategoryDetailsComponent,
    KFormaterPipe,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
