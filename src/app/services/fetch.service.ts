import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private _http: HttpClient) { }
  
  private _apiUrl: string = "http://localhost:3000/proxy?targetUrl=https://europop.ge/api/posts/295191";

  getData() {
    return this._http.get(this._apiUrl);
  }
}
