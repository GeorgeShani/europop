import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TraceRouteService {
  private currentRoute = new BehaviorSubject<string>("");

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.next(event.urlAfterRedirects);
    });
  }

  isAuthRoute(): boolean {
    const authRoutes = ['/login', '/registration'];
    return authRoutes.includes(this.currentRoute.getValue());
  }
}
