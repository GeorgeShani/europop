import { Component } from '@angular/core';
import { externals } from '../../interfaces/external-links.model';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss'
})
export class AuthorsComponent {
  authorsData!: any;
  regularPosts!: any;
  first7RegularPosts: any[] = [];

  userIcon: string = "./../../../assets/images/user-icon.svg";

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ];

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }

  redirectToAuthor(id: number) {
    window.location.href = `/author/${id}`;
  }

  constructor(private _fetch: FetchService) {
    this._fetch.getAuthors(1, 15).subscribe((data) => {
      this.authorsData = data;
    });

    this._fetch.getData("regularPosts").subscribe((data) => {
      this.regularPosts = data;

      if (this.regularPosts.data.length > 7) {
        for (let i = 0; i < 7; i++) {
          this.first7RegularPosts.push(this.regularPosts.data[i]);
        }
      }
    });
  }
}
