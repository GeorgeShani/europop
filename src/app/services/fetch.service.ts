import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIs } from '../interfaces/api.model';
import { Observable } from 'rxjs';

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
    searchAPI: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/search",
    postsPoweredByEuropebet: "https://europop.ge/api/posts/powered-by-europebet",
    featuredPostPoweredByEuropebet: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/powered-by-europebet/featured",
    georgianSportPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/by-category-id?categoryId=180837&size=30",
    khvichaKvaratskheliaPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/by-category-id?categoryId=182094&size=30",
    nationalFootballTeamPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/by-category-id?categoryId=180246&size=30",
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

  getSearchResult(searchQuery: string): Observable<any[]> {
    let url = this._europopAPIs["searchAPI"] + `?query=${searchQuery}&detailed=true`;
    return this._http.get<any[]>(url);
  }
}
