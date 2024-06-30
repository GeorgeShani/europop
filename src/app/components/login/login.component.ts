import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  googleLogo: string = "./../../../assets/images/google-logo.svg";
  facebookLogo: string = "./../../../assets/images/facebook-logo.svg";
  appleLogo: string = "./../../../assets/images/apple-logo.svg";

  constructor(public login: LoginService) { }

  showPassword: boolean = false;
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  enableButton() {
    if (this.login.checkAllCredentials()) {
      return { 'background-color': '#F15A22', 'color': '#fff' };
    }

    return { 'background-color': 'rgb(43, 44, 46)', 'color': 'rgb(172, 172, 172)' }
  }
}
