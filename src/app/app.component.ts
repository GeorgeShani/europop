import { Component } from '@angular/core';
import { FetchService } from './services/fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-project';
  data!: any;

  constructor(private _fetch: FetchService) {
    this._fetch.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
