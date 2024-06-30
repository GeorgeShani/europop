import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { externals } from '../../interfaces/external-links.model';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-europebet-posts',
  templateUrl: './europebet-posts.component.html',
  styleUrl: './europebet-posts.component.scss'
})
export class EuropebetPostsComponent {
  europebetPosts!: any;
  featuredEuropebetPost!: any;
  regularPosts!: any;
  first7RegularPosts: any[] = [];

  userEmail!: string;

  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  europeBetLittleLogo: string = "./../../../assets/images/europebet-little-logo.png";

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ];

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }

  enableButton() {
    if (this._regex.validateEmail(this.userEmail)) {
      return { 'background-color': '#000', 'color': '#fff' };
    }

    return { 'background-color': '#2B2C2E', 'color': '#ACACAC' };
  }

  subscribe() {
    if (this.userEmail && this._regex.validateEmail(this.userEmail)) {
      alert('გამოწერა წარმატებულია');
      this.userEmail = "";
    }
  }

  constructor(private _fetch: FetchService, private _regex: RegexService) {
    this._fetch.getPostsByEuropebet(20).subscribe((data) => {
      this.europebetPosts = data;
    });

    this._fetch.getData("featuredPostPoweredByEuropebet").subscribe((data) => {
      this.featuredEuropebetPost = data;
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
