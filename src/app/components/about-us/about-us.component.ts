import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  shakoProfileImage: string = "./../../../assets/images/shako.png";
  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  plusSign: string = "./../../../assets/images/plus-sign.svg";
  bigE: string = "./../../../assets/images/big-e.svg";

  authorsData!: any;

  constructor(private _fetch: FetchService) {
    this._fetch.getAuthors(1, 15).subscribe((data) => { 
      this.authorsData = data;
    });
  }

  redirectToAuthors() {
    window.location.href = "/authors";
  }

  redirectToLogin() {
    window.location.href = "/auth/login";
  }
}
