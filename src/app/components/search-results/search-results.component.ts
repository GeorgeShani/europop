import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  query: string = "";
  results!: any;
  first8Posts: any[] = [];

  europeBetMiniLogo: string = "./../../../assets/images/europebet-little-logo.png";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  eLogo: string = "./../../../assets/images/e-logo-gray.svg";

  constructor(
    private _fetch: FetchService,
    private _route: ActivatedRoute,
    private _title: Title
  ) {
    this._route.queryParams.subscribe((params) => {
      this.query = params['query'];
      if (this.query) {
        this._title.setTitle(`${this.query} - Europop`);
        
        this._fetch.getSearchResult(this.query).subscribe((data) => {
          this.results = data;

          if (this.results.data.posts.length >= 8) {
            this.first8Posts = [];

            for (let i = 0; i < 8; i++) {
              this.first8Posts.push(this.results.data.posts[i]);
            }
          }
        });
      }
    });
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }

  redirectToCategory(id: number) {
    window.location.href = `/category/${id}`;
  }

  redirectToAuthors() {
    window.location.href = "/authors";
  }

  redirectToAuthor(id: number) {
    window.location.href = `/author/${id}`;
  }
}
