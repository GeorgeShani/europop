import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrl: './author-profile.component.scss'
})
export class AuthorProfileComponent implements OnInit {
  authorProfileData!: any;
  postsByAuthor!: any;
  
  pageIndex: number = 1;
  currentPage: number = this.postsByAuthor.currentPage;
  totalPages: number = this.postsByAuthor.totalPages;

  constructor(
    private _route: ActivatedRoute,
    private _fetch: FetchService,
    private _title: Title
  ) { }
  
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const id = params['id'];

      this._fetch.getAuthorById(id).subscribe((data) => {
        this.authorProfileData = data;
        this._title.setTitle(
          `${this.authorProfileData.data.firstName} ${this.authorProfileData.data.lastName} - Europop`
        );
      });

      this._fetch.getPostsByAuthor(id, this.pageIndex).subscribe((data) => {
        this.postsByAuthor = data;
      });
    });
  }
}
