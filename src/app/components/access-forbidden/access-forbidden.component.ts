import { Component } from '@angular/core';

@Component({
  selector: 'app-access-forbidden',
  templateUrl: './access-forbidden.component.html',
  styleUrl: './access-forbidden.component.scss'
})
export class AccessForbiddenComponent {
  forbiddenCover: string = "./../../../assets/images/403Bg.png";

  redirectToHome() {
    window.location.href = "/";
  }
}
