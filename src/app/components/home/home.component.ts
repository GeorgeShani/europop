import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { externals } from '../../interfaces/external-links.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  epopPlusLogoGray: string = "./../../../assets/images/eplus-gray.png";
  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  europeBetLittleLogo: string = "./../../../assets/images/europebet-little-logo.png";
  playButton: string = "./../../../assets/images/play.svg";

  featuredPostsData!: any;
  firstFourFeaturedPosts: any[] = [];
  europebetPosts!: any;
  featuredEuropebetPost!: any;
  analyticalPosts!: any;
  authorsData!: any;
  regularPosts!: any;
  latePosts!: any;
  latestPosts!: any;
  moreLatestPosts!: any;
  evenMoreLatestPosts!: any;

  awayMeetingsVideoGallery!: any;
  europopForumVideoGallery!: any;
  tableDerbyVideoGallery!: any;

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ];

  mobileStoreLinks: externals[] = [
    { name: "", imageUrl: "./../../../assets/images/appstore.png", linkUrl: "https://apps.apple.com/ge/app/europop-sports-news/id6480219097" },
    { name: "", imageUrl: "./../../../assets/images/googleplay.png", linkUrl: "https://play.google.com/store/apps/details?id=ge.europop.sport.news&hl=en_US" },
  ];

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
    });

    this._fetch.getData("latestPosts").subscribe((data) => {
      this.latePosts = data;
    });

    this._fetch.getData("regularPosts").subscribe((data) => {
      this.regularPosts = data;
    });

    this._fetch.getData("popularPosts").subscribe((data) => {
      this.latestPosts = data;
    });

    this._fetch.getData("analyticalPosts").subscribe((data) => {
      this.analyticalPosts = data;
    });

    this._fetch.getAuthors(1, 15).subscribe((data) => {
      this.authorsData = data;
    });

    this._fetch.getLatestPostsById(509).subscribe((data) => {
      this.moreLatestPosts = data;
    });

    this._fetch.getLatestPostsById(527).subscribe((data) => {
      this.evenMoreLatestPosts = data;
    });

    this._fetch.getVideoGalleryById(141).subscribe((data) => {
      this.tableDerbyVideoGallery = data;
    })

    this._fetch.getVideoGalleryById(142).subscribe((data) => {
      this.awayMeetingsVideoGallery = data;
    });

    this._fetch.getVideoGalleryById(143).subscribe((data) => {
      this.europopForumVideoGallery = data;
    });
  }

  redirectToRegister() {
    window.location.href = "/auth/register";
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }

  redirectToAnalyticalPosts() {
    window.location.href = "/posts/analytics";
  }

  redirectToAuthors() {
    window.location.href = "/authors";
  }

  redirectToAuthor(id: number) {
    window.location.href = `/author/${id}`;
  }

  redirectToYoutubePlaylist(playlistId: number) {
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  }
}
