import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  googleLogo: string = "./../../../assets/images/google-logo.svg";
  facebookLogo: string = "./../../../assets/images/facebook-logo.svg";
  appleLogo: string = "./../../../assets/images/apple-logo.svg";

  constructor(public register: RegisterService) { }

  showPassword: boolean = false;
  showConfirmedPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmedPasswordVisibility() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  checkIfPasswordIs8CharsLong() {
    const regex: RegExp = /^.{8,}$/;
    return regex.test(this.register.getUserData().userPassword);
  }

  checkIfPasswordContainsCapitalLetters(): boolean {
    const regex: RegExp = /[A-Z]/;
    return regex.test(this.register.getUserData().userPassword);
  }

  checkIfPasswordContainsLowercaseLetters(): boolean {
    const regex: RegExp = /[a-z]/;
    return regex.test(this.register.getUserData().userPassword);
  }

  checkIfPasswordContainsNumbers(): boolean {
    const regex: RegExp = /[0-9]/;
    return regex.test(this.register.getUserData().userPassword);
  }

  checkEmail(): boolean {
    return this.register.checkEmailPrecisely();
  }

  getIconStyles(checkedPass: boolean) {
    return { 'background-color': checkedPass ? '#369D34' : '#333334' };
  }

  revealCheckIcon(checkEmail: boolean) {
    return { 'display': checkEmail ? 'block' : 'none' };
  }
}
