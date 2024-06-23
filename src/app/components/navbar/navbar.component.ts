import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {  
  @Input() modified!: boolean;
  
  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  georgianSport: string = "https://cdn.europop.ge/1090795a-c062-4604-b795-1b26227fc00b";
  kvaratskheliaNumber: string = "https://cdn.europop.ge/8b247cf1-fca5-48bf-a143-20b3ab2d9142";
  nakrebiLogo: string = "https://cdn.europop.ge/49472241-5caf-4fc8-90b5-cbf3e96f5232";

  constructor(private _router: Router) {}

  searchQuery!: string;

  getSearchResults() {
    if (this.searchQuery) {
      this._router.navigate(['/search'], {
        queryParams: {
          query: this.searchQuery
        }
      });
    }
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getSearchResults();
    }
  }
}
