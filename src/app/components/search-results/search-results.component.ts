import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  results: any[] = [];
  query: string = "";

  constructor(private _fetch: FetchService, private _route: ActivatedRoute) {
    this._route.queryParams.subscribe((params) => {
      this.query = params['query'];
      if (this.query) {
        this._fetch.getSearchResult(this.query).subscribe((data) => {
          this.results = data;
          console.log(this.results);
        });
      }
    });
  }
}
