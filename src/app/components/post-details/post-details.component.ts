import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';
import { ExternalContentExtractorService } from '../../services/external-content-extractor.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  europeBetMiniLogo: string = "./../../../assets/images/europebet-little-logo.png";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  userIcon: string = "./../../../assets/images/user-icon.svg";
  leftQuote: string = "./../../../assets/images/left-quote.svg";
  rightQuote: string = "./../../../assets/images/right-quote.svg";
  paperPlane: string = "./../../../assets/images/paper-plane.svg";

  regularPosts!: any;
  postDetails!: any;
  postComments!: any;
  similarPosts!: any;
  videoPlayerHtml!: SafeHtml;
  oembedContents: { [key: number]: SafeHtml } = {};

  currentIndexes: number[] = [];

  constructor(
    public _contentExtractor: ExternalContentExtractorService,
    public _domSanitizer: DomSanitizer,
    private _fetch: FetchService,
    private _route: ActivatedRoute,
    private _title: Title,
  ) { }

  showSlide(moduleIndex: number, index: number): void {
    this.currentIndexes[moduleIndex] = index;
  }

  prevSlide(moduleIndex: number): void {
    const totalSlides = this.postDetails.data.modules[moduleIndex].items.length;
    this.currentIndexes[moduleIndex] = (this.currentIndexes[moduleIndex] - 1 + totalSlides) % totalSlides;
  }

  nextSlide(moduleIndex: number): void {
    const totalSlides = this.postDetails.data.modules[moduleIndex].items.length;
    this.currentIndexes[moduleIndex] = (this.currentIndexes[moduleIndex] + 1) % totalSlides;
  }

  redirectToAuthorization(): void {
    window.location.href = "/auth/login";
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }

  redirectToCategory(id: number) {
    window.location.href = `/category/${id}`;
  }

  redirectToAuthor(id: number) {
    window.location.href = `/author/${id}`;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      
      this._fetch.getById(id).subscribe((data) => {
        this.postDetails = data;
        this._title.setTitle(`${this.postDetails.data.title} - Europop`);

        if (this.postDetails.data.modules) {
          this.postDetails.data.modules.forEach((module: any, index: number) => {
            if (module.type === 'TEXT') {
              const oembedUrl = this._contentExtractor.extractOEmbedContent(module.text);
              const videoLink = this._contentExtractor.extractVideoLink(module.text);

              if (oembedUrl) {
                this._contentExtractor.getOembedData(oembedUrl).subscribe((embedData) => {
                  this.oembedContents[index] = this._domSanitizer.bypassSecurityTrustHtml(embedData.html);
                });
              }

              if (videoLink) {
                const videoPlayerHtmlString = `<iframe src="${videoLink}" frameborder="0" allowfullscreen></iframe>`;
                this.videoPlayerHtml = this._domSanitizer.bypassSecurityTrustHtml(videoPlayerHtmlString);
              }
            }

            if (module.type === 'PHOTO_GALLERY') {
              if (module.items.length > 1) {
                this.currentIndexes[index] = 0;
              }
            }
          });
        }
      });

      this._fetch.getPostComments(id).subscribe((comments) => {
        this.postComments = comments;
      });

      this._fetch.getSimilarPosts(id).subscribe((similarPosts) => {
        this.similarPosts = similarPosts;
      });
    });

    this._fetch.getData("regularPosts").subscribe((data) => {
      this.regularPosts = data;
    });
  }
}
