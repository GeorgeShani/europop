import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TraceRouteService } from './services/trace-route.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showFooter = true;
  modifyNavbar = false;

  constructor(private router: Router, private routeService: TraceRouteService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showFooter = !this.routeService.isAuthRoute();
      this.modifyNavbar = this.routeService.isAuthRoute();
    });
  }
}
