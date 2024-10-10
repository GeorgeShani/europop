import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { externals } from '../../interfaces/external-links.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  epopPlusLogoGray: string = "./../../../assets/images/eplus-gray.png";
  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  europeBetLittleLogo: string = "./../../../assets/images/europebet-little-logo.png";
  playButton: string = "./../../../assets/images/play.svg";

  userEmail!: string;

  featuredPostsData!: any;
  firstFourFeaturedPosts: any[] = [];
  europebetPosts!: any;
  featuredEuropebetPost!: any;
  analyticalPosts!: any;
  hotTopics!: any;
  authorsData!: any;
  regularPosts!: any;
  latePosts!: any;
  latestPosts!: any;
  moreLatestPosts!: any;
  evenMoreLatestPosts!: any;

  awayMeetingsVideoGallery!: any;
  europopForumVideoGallery!: any;
  tableDerbyVideoGallery!: any;

  currentVideoId: string[] = ["_vGmWkXkRz4", "zRgFViXgPZ4", "IeKMkfSUNt4"];
  isVideoPlayerPlaying: boolean[] = [false, false, false];
  videoName: string[] = ["გასვლითი დაზვერვა გერმანიაში", "", "ლაშა VS ჯანელა | 1/8-ფინალი [მაგიდის დერბი]"];

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

  constructor(
    private _fetch: FetchService,
    private _sanitizer: DomSanitizer,
    private _regex: RegexService
  ) { }

  ngOnInit(): void {
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

    this._fetch.getData("hotTopics").subscribe((data) => {
      this.hotTopics = data;
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

  setVideoId(index: number, videoId: string, videoName: string) {
    this.isVideoPlayerPlaying[index] = false;
    this.currentVideoId[index] = videoId;
    this.videoName[index] = videoName;
  }

  playVideo(index: number) {
    this.isVideoPlayerPlaying[index] = true;
  }

  playOuterVideo(index: number, videoId: string) {
    this.isVideoPlayerPlaying[index] = true;
    this.currentVideoId[index] = videoId;
  }

  closeOuterVideo(index: number) {
    this.isVideoPlayerPlaying[index] = false;
  }

  getThumbnail(videoId: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&start=0`);
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

  redirectToHotTopics() {
    window.location.href = "/posts/hot-topics";
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
