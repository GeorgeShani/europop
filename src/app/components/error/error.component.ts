import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  errorCover: string = "./../../../assets/images/error-cover-404.png";

  redirectToHome() {
    window.location.href = "/";
  }
}
