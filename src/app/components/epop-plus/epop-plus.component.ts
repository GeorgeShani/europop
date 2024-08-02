import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { externals } from '../../interfaces/external-links.model';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-epop-plus',
  templateUrl: './epop-plus.component.html',
  styleUrl: './epop-plus.component.scss'
})
export class EpopPlusComponent {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  epopPlusLogoGray: string = "./../../../assets/images/eplus-gray.png";
  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  europeBetLittleLogo: string = "./../../../assets/images/europebet-little-logo.png";
  playButton: string = "./../../../assets/images/play.svg";

  europebetPosts!: any;
  featuredEuropebetPost!: any;
  analyticalPosts!: any;
  hotTopics!: any;
  moreLatestPosts!: any;
  evenMoreLatestPosts!: any;

  awayMeetingsVideoGallery!: any;
  europopForumVideoGallery!: any;
  tableDerbyVideoGallery!: any;

  currentVideoId: string[] = ["_vGmWkXkRz4", "zRgFViXgPZ4", "1TgM0z2dnQ0"];
  isVideoPlayerPlaying: boolean[] = [false, false, false];
  videoName: string[] = ["გასვლითი დაზვერვა გერმანიაში", "", "ტატო VS მინა | სუპერფინალი [მაგიდის დერბი]"];

  userEmail!: string;

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ];

  constructor(
    private _fetch: FetchService,
    private _sanitizer: DomSanitizer,
    private _regex: RegexService
  ) { 
    this._fetch.getData("analyticalPosts").subscribe((data) => {
      this.analyticalPosts = data;
    });

    this._fetch.getData("hotTopics").subscribe((data) => {
      this.hotTopics = data;
    });

    this._fetch.getPostsByEuropebet(3).subscribe((data) => {
      this.europebetPosts = data;
    });

    this._fetch.getData("featuredPostPoweredByEuropebet").subscribe((data) => {
      this.featuredEuropebetPost = data;
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

  redirectToAuthor(id: number) {
    window.location.href = `/author/${id}`;
  }

  redirectToYoutubePlaylist(playlistId: number) {
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  }
}
