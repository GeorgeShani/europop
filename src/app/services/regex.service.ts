import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
  constructor() { }
  
  validateEmail(email: string) {
    const regex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return regex.test(email);
  }

  validatePhoneNumber(phoneNumber: string) {
    const regex: RegExp = /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/gm;
    return regex.test(phoneNumber);
  }

  validatePassword(password: string) {
    const regex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return regex.test(password);
  }
}
