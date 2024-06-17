import { Injectable } from '@angular/core';
import { RegexService } from './regex.service';
import { RegUser } from '../interfaces/register-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _regex: RegexService) { }

  user: RegUser = {
    userEmail: "",
    userPassword: "",
    userConfirmedPassword: "",
    errors: {
      userEmailError: "",
      userPasswordError: "",
      userConfirmedPasswordError: ""
    }
  };

  getUserData() {
    return this.user;
  }

  checkIsEmpty() {
    return this.user.userEmail === "" &&
      this.user.userPassword === "" &&
      this.user.userConfirmedPassword === "";
  }

  checkIsFull() {
    return this.user.userEmail !== "" &&
      this.user.userPassword !== "" &&
      this.user.userConfirmedPassword !== "";
  }

  checkAllCredentials() {
    return this._regex.validateEmail(this.user.userEmail) &&
      this._regex.validatePassword(this.user.userPassword) &&
      this._regex.validatePassword(this.user.userConfirmedPassword);
  }

  emptyOutCredentials() {
    this.user.userEmail = "";
    this.user.userPassword = "";
    this.user.userConfirmedPassword = "";

    this.user.errors.userEmailError = "";
    this.user.errors.userPasswordError = "";
    this.user.errors.userConfirmedPasswordError = "";
  }

  checkEmail() {
    if (this.user.userEmail === "") {
      this.user.errors.userEmailError = "გთხოვთ, შეავსოთ მეილის ველი";
      return;
    } else if (!this._regex.validateEmail(this.user.userEmail)) {
      this.user.errors.userEmailError = "ელ-ფოსტის ფორმატი არასწორია";
    } else {
      this.user.errors.userEmailError = "";
    }
  }

  checkEmailPrecisely() {
    return this._regex.validateEmail(this.user.userEmail);
  }

  checkPassword() {
    if (this.user.userPassword === "") {
      this.user.errors.userPasswordError = "გთხოვთ, შეავსოთ პაროლის ველი";
      return;
    } else if (!this._regex.validatePassword(this.user.userPassword)) {
      this.user.errors.userPasswordError = "პაროლის ფორმატი არასწორია";
    } else {
      this.user.errors.userPasswordError = "";
    }
  }

  checkPasswordPrecisely() {
    return this._regex.validatePassword(this.user.userPassword);
  }

  comparePasswords() {
    if (this.user.userConfirmedPassword === "") {
      this.user.errors.userConfirmedPasswordError = "გთხოვთ, განმეორებით შეავსოთ პაროლის ველი";
      return;
    } else if (this.user.userPassword !== this.user.userConfirmedPassword) {
      this.user.errors.userConfirmedPasswordError = "პაროლები არ ემთხვევა";
    } else {
      this.user.errors.userConfirmedPasswordError = "";
    }
  }

  register() {
    if (this.checkIsEmpty()) {
      alert("გთხოვთ, შეავსოთ ყველა მოცემული ველი");
      return;
    }

    this.checkEmail();
    this.checkPassword();
    this.comparePasswords();

    if (this.checkIsFull() && this.checkAllCredentials()) {
      alert("თქვენ დარეგისტრირდით ;)");
      this.emptyOutCredentials();
    }
  }
}
