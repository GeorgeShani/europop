import { Component } from '@angular/core';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {
  constructor(private _regex: RegexService) { }

  recoverPassword() {
    if (this.userEmailOrPhoneNumber === "") {
      this.userEmailOrPhoneNumberError = "გთხოვთ, შეავსოთ ველი";
    } else if (!this.checkNumber() && !this.checkEmail()) {
      this.userEmailOrPhoneNumberError = "მითითებული ელ-ფოსტით ან მობილურის ნომრით მომხმარებელი ვერ მოიძებნა";
    } else {
      this.userEmailOrPhoneNumberError = "";
    }

    if (this.checkNumber() || this.checkEmail()) {
      alert("დამადასტურებელი წერილი მაოგივათ \nთქვენს ელ-ფოსტაზე ან მობილურის ნომერზე");
      this.userEmailOrPhoneNumber = "";
    }
  }

  checkNumber() {
    return this._regex.validatePhoneNumber(this.userEmailOrPhoneNumber);
  }

  checkEmail() {
    return this._regex.validateEmail(this.userEmailOrPhoneNumber);
  }

  userEmailOrPhoneNumber!: string;
  userEmailOrPhoneNumberError!: string;

  enableButton() {
    if (this.checkEmail() || this.checkNumber()) {
      return { 'background-color': '#F15A22', 'color': '#fff' };
    }

    return { 'background-color': 'rgb(43, 44, 46)', 'color': 'rgb(172, 172, 172)' }
  }
}
