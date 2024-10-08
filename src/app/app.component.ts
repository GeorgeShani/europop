import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  modifyNavbar: boolean = false;
  showFooter: boolean = true;

  constructor(private _router: Router) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        const authPaths = [
          '/auth/login', '/auth/register', '/auth/password-recovery',
          '/terms-and-conditions', '/privacy-policy'
        ];
        this.modifyNavbar = authPaths.includes(currentRoute);
        this.showFooter = !this.modifyNavbar;
      }
    });
  }
}
