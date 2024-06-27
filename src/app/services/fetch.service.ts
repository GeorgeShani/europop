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
    analyticalPosts: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/analytic",
    authors: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/authors",
    searchAPI: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/search",
    videoGallery: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/video-galleries",
    categoryData: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/categories",
    postsByCategoryId: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/by-category-id",
    postsPoweredByEuropebet: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/powered-by-europebet",
    featuredPostPoweredByEuropebet: "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/powered-by-europebet/featured"
  };

  getData(endpoint: string) {
    return this._http.get(this._europopAPIs[endpoint]);
  }

  getById(id: number) {
    let url = this._europopAPIs["regularPosts"] + `/${id}`;
    return this._http.get(url);
  }

  getPostComments(id: number) {
    let url = this._europopAPIs["regularPosts"] + `/${id}/comments`;
    return this._http.get(url);
  }

  getSimilarPosts(id: number) {
    let url = this._europopAPIs["regularPosts"] + `/${id}/similar`;
    return this._http.get(url);
  }

  getCategoryById(id: number) {
    let url = this._europopAPIs["categoryData"] + `/${id}`;
    return this._http.get(url);
  }

  getPostsByCategory(categoryId: number) {
    let url = this._europopAPIs["postsByCategoryId"] + `?categoryId=${categoryId}&size=30`;
    return this._http.get(url);
  }

  getVideoGalleryById(id: number) {
    let url = this._europopAPIs["videoGallery"] + `/${id}`;
    return this._http.get(url);
  }

  getAuthors(page: number, size: number) {
    let url = this._europopAPIs["authors"] + `?page=${page}&size=${size}`;
    return this._http.get(url);
  }

  getAuthorById(id: number) {
    let url = this._europopAPIs["authors"] + `/${id}`;
    return this._http.get(url);
  }

  getPostsByAuthor(id: number, pageIndex: number) {
    let url = this._europopAPIs["authors"] + `/${id}/resources?page=${pageIndex}`;
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

  getLatestPostsById(id: number) {
    let url = this._europopAPIs["latestPosts"] + `?siteBlockId=${id}`;
    return this._http.get(url);
  }
}
