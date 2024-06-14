import { Injectable } from '@angular/core';
import { RegexService } from './regex.service';
import { LogInUser } from '../interfaces/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _regex: RegexService) { }
  
  user: LogInUser = {
    userEmail: "",
    userPassword: "",
    errors: {
      userEmailError: "",
      userPasswordError: ""
    }
  };

  getUserData() {
    return this.user;
  }

  checkIsEmpty() {
    return this.user.userEmail === "" &&
      this.user.userPassword === "";
  }

  checkIsFull() {
    return this.user.userEmail !== "" &&
      this.user.userPassword !== "";
  }

  checkAllCredentials() {
    return this._regex.validateEmail(this.user.userEmail) &&
      this._regex.validatePassword(this.user.userPassword);
  }

  emptyOutCredentials() {
    this.user.userEmail = "";
    this.user.userPassword = "";

    this.user.errors.userEmailError = "";
    this.user.errors.userPasswordError = "";
  }

  checkEmail() {
    if (this.user.userEmail === "") {
      this.user.errors.userEmailError = "გთხოვთ შეავსოთ მეილის ველი";
      return;
    } else if (!this._regex.validateEmail(this.user.userEmail)) {
      this.user.errors.userEmailError = "ელ-ფოსტის ფორმატი არასწორია";
    } else {
      this.user.errors.userEmailError = "";
    }
  }

  checkPassword() {
    if (this.user.userPassword === "") {
      this.user.errors.userPasswordError = "გთხოვთ შეავსოთ პაროლის ველი";
      return;
    } else if (!this._regex.validatePassword(this.user.userPassword)) {
      this.user.errors.userPasswordError = "პაროლის ფორმატი არასწორია";
    } else {
      this.user.errors.userPasswordError = "";
    }
  }

  login() {
    if (this.checkIsEmpty()) {
      alert("გთხოვთ, შეავსოთ ყველა მოცემული ველი");
      return;
    }

    this.checkEmail();
    this.checkPassword();

    if (this.checkIsFull() && this.checkAllCredentials()) {
      alert("თქვენ წარმატებულად გაიარეთ ავტორიზაცია ;)");
      this.emptyOutCredentials();
    }
  }
}
