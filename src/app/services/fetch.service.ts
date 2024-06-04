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
    latePosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/latest",
    latestPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/more-latest",
    popularPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/popular",
    analyticPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/analytic",
    europebetPosts: "https://europop.ge/api/posts/powered-by-europebet?size=10",
    authors: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/authors?page=1&size=15",
  };

  getData(endpoint: string) {
    return this._http.get(this._europopAPIs[endpoint]);
  }

  getById(id: number)  {
    let url = this._europopAPIs["regularPosts"] + `/${id}`;
    return this._http.get(url);
  }
}
