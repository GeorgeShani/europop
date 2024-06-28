import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';
import { externals } from '../../interfaces/external-links.model';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrl: './author-profile.component.scss'
})
export class AuthorProfileComponent implements OnInit {
  @ViewChild('scrollSection') scrollSection!: ElementRef;
  
  europeBetMiniLogo: string = "./../../../assets/images/europebet-little-logo.png";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  poweredBy: string = "./../../../assets/images/powered-by.svg";
  europeBetLogo: string = "./../../../assets/images/europebet-logo.svg";
  eLogo: string = "./../../../assets/images/e-logo-gray.svg";

  authorProfileData!: any;
  postsByAuthor!: any;

  regularPosts!: any;
  europebetPosts!: any;
  featuredEuropebetPost!: any;

  authorID!: number;
  pageIndex: number = 1;
  currentPage!: number;
  totalPages!: number;
  windowSize: number = 10;
  paginationRange: number[] = [];

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

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.authorID = params['id'];

      this._fetch.getAuthorById(this.authorID).subscribe((data) => {
        this.authorProfileData = data;
        this._title.setTitle(
          `${this.authorProfileData.data.firstName} ${this.authorProfileData.data.lastName} - Europop`
        );
      });

      this.fetchPostsByAuthor(this.authorID, this.pageIndex);
    });
  }

  fetchPostsByAuthor(authorId: number, page: number): void {
    this._fetch.getPostsByAuthor(authorId, page).subscribe((data) => {
      this.postsByAuthor = data;
      this.currentPage = this.postsByAuthor.currentPage;
      this.totalPages = this.postsByAuthor.totalPages;
      this.updatePaginationButtons();
    });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return;
    }

    this.currentPage = pageNumber;
    this.fetchPostsByAuthor(this.authorID, pageNumber);
    this.scrollToTop();
  }

  scrollToTop(): void {
    if (this.scrollSection && this.scrollSection.nativeElement) {
      this.scrollSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updatePaginationButtons(): void {
    let startPage = Math.max(1, this.currentPage - Math.floor(this.windowSize / 2));
    let endPage = Math.min(this.totalPages, startPage + this.windowSize - 1);

    if (endPage - startPage + 1 < this.windowSize) {
      if (startPage === 1) {
        endPage = Math.min(this.totalPages, startPage + this.windowSize - 1);
      } else if (endPage === this.totalPages) {
        startPage = Math.max(1, endPage - this.windowSize + 1);
      }
    }

    this.paginationRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }

  redirectToAuthor(id: number) {
    window.location.href = `/author/${id}`;
  }
}
