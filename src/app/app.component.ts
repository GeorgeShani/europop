import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = "angular-project";

  modifyNavbar: boolean = false;
  showFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.modifyNavbar = ['/auth/login', '/auth/registration'].includes(currentRoute);
        this.showFooter = !this.modifyNavbar;
      }
    });
  }
}
