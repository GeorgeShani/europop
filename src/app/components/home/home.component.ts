import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  europeBetLittleLogo: string = "./../../../assets/images/europop-logo.png";

  featuredPostsData!: any;
  firstFourFeaturedPosts: any[] = [];
  europebetPosts!: any;
  featuredEuropebetPost!: any;

  constructor(private _fetch: FetchService) {
    this._fetch.getData("featuredPosts").subscribe((data) => {
      this.featuredPostsData = data;

      for (let i = 0; i < 4; i++) {
        this.firstFourFeaturedPosts.push(this.featuredPostsData.data[i]);
      }
    });

    this._fetch.getPostsByEuropebet(3).subscribe((data) => {
      this.europebetPosts = data;
    });

    this._fetch.getData("featuredPostPoweredByEuropebet").subscribe((data) => {
      this.featuredEuropebetPost = data;
      console.log(this.featuredEuropebetPost);
    });
  }

  redirectToRegister() {
    window.location.href = "/auth/register";
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/posts/${id}`;
  }
}
