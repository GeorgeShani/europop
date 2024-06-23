import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { externals } from '../../interfaces/external-links.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  europeBetLittleLogo: string = "./../../../assets/images/europebet-little-logo.png";

  categoryData!: any;
  postsByCategory!: any;
  regularPosts!: any;
  first7RegularPosts: any[] = [];

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ];

  constructor(
    private _fetch: FetchService,
    private _route: ActivatedRoute,
    private _title: Title
  ) {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      
      this._fetch.getCategoryById(id).subscribe((data) => {
        this.categoryData = data;
        this._title.setTitle(`${this.categoryData.data.name} - Europop`);
      });

      this._fetch.getPostsByCategory(id).subscribe((data) => {
        this.postsByCategory = data;
      });
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

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }
}
