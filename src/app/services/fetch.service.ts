import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIs } from '../interfaces/api.model';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(private _http: HttpClient) {}
  
  private _europopAPIs: APIs = {
    regularPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts",
    featuredPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/featured-posts",
    latestPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/latest",
    popularPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/popular",
    analyticPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/analytic",
    authors: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/authors",
    postsPoweredByEuropebet: "https://europop.ge/api/posts/powered-by-europebet",
    searchAPI: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/search",
    featuredPostPoweredByEuropebet: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/powered-by-europebet/featured",
  };

  getData(endpoint: string) {
    return this._http.get(this._europopAPIs[endpoint]);
  }

  getById(id: number)  {
    let url = this._europopAPIs["regularPosts"] + `/${id}`;
    return this._http.get(url);
  }

  getAuthors(page: number, size: number) {
    let url = this._europopAPIs["authors"] + `?page=${page}&size=${size}`;
    return this._http.get(url);
  } 

  getPostsByEuropebet(size: number) {
    let url = this._europopAPIs["postsPoweredByEuropebet"] + `?size=${size}`;
    return this._http.get(url);
  }

  getSearchResult(searchQuery: string) {
    let url = this._europopAPIs["searchAPI"] + `?query=${searchQuery}&detailed=true`;
    return this._http.get(url);
  }
}
