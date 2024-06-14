import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";

  postDetails!: any;

  redirectToAuthorization(): void {
    window.location.href = "/auth/login";
  }
  
  constructor(private _fetch: FetchService, private _route: ActivatedRoute, private _title: Title) {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._fetch.getById(id).subscribe((data) => {
        this.postDetails = data;
        this._title.setTitle(this.postDetails.data.title + " - Europop");
      });
    });
  }
}
