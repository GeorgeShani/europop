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
  
  constructor(public register: RegisterService) {}
}
