import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';
import { ExternalContentExtractorService } from '../../services/external-content-extractor.service';

declare var twitter: any;

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  userIcon: string = "./../../../assets/images/user-icon.svg";
  
  postDetails!: any;
  postComments!: any;
  similarPosts!: any;
  videoPlayerHtml!: SafeHtml;
  oembedContents: { [key: number]: SafeHtml } = {};

  redirectToAuthorization(): void {
    window.location.href = "/auth/login";
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/posts/${id}`;
  }
  
  constructor(
    public _contentExtractor: ExternalContentExtractorService,
    public _domSanitizer: DomSanitizer,
    private _fetch: FetchService,
    private _route: ActivatedRoute,
    private _title: Title,
  ) { }
  
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
  }
}
