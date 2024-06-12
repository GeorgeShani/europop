import { Component } from '@angular/core';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {
  constructor(private _regex: RegexService) { }
  
  userEmailOrPhoneNumber!: string;
}
