import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {
  postDetails!: any;
  
  constructor(private _fetch: FetchService, private _route: ActivatedRoute) { 
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._fetch.getById(id).subscribe((data) => {
        this.postDetails = data;
      });
    });
  }
}
