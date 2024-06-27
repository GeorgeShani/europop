import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';
import { externals } from '../../interfaces/external-links.model';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrl: './author-profile.component.scss'
})
export class AuthorProfileComponent {
  authorProfileData!: any;
  postsByAuthor!: any;

  regularPosts!: any;
  europebetPosts!: any;
  featuredEuropebetPost!: any;

  pageIndex: number = 1;
  currentPage: number = this.postsByAuthor.currentPage;
  totalPages: number = this.postsByAuthor.totalPages;

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ];

  constructor(
    private _route: ActivatedRoute,
    private _fetch: FetchService,
    private _title: Title
  ) {
    this._route.params.subscribe((params) => {
      const id = params['id'];

      this._fetch.getAuthorById(id).subscribe((data) => {
        this.authorProfileData = data;
        this._title.setTitle(
          `${this.authorProfileData.data.firstName} ${this.authorProfileData.data.lastName} - Europop`
        );
      });

      this._fetch.getPostsByAuthor(id, 1).subscribe((data) => {
        this.postsByAuthor = data;
      });
    });

    this._fetch.getData("regularPosts").subscribe((data) => {
      this.regularPosts = data;

      if (this.regularPosts.data.length > 7) {
        this.regularPosts.data = this.regularPosts.data.slice(0, 7);
      }
    });

    this._fetch.getPostsByEuropebet(3).subscribe((data) => {
      this.europebetPosts = data;
    });

    this._fetch.getData("featuredPostPoweredByEuropebet").subscribe((data) => {
      this.featuredEuropebetPost = data;
    });
  }
}
