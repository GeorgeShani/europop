import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  georgianSport: string = "https://cdn.europop.ge/1090795a-c062-4604-b795-1b26227fc00b";
  kvaratskheliaNumber: string = "https://cdn.europop.ge/8b247cf1-fca5-48bf-a143-20b3ab2d9142";
  nakrebiLogo: string = "https://cdn.europop.ge/49472241-5caf-4fc8-90b5-cbf3e96f5232";

  constructor(private _fetch: FetchService) { }

  searchQuery!: string;

  getSearchResults() {
    this._fetch.getSearchResult(this.searchQuery).subscribe((data) => {
      console.log(data);
    });
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getSearchResults();
    }
  }
}
