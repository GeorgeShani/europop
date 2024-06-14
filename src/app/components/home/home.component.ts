import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  epopPlusLogo: string = "./../../../assets/images/eplus.png";

  featuredPostsData!: any;
  firstFourFeaturedPosts: any[] = [];

  constructor(private _fecth: FetchService) {
    this._fecth.getData("featuredPosts").subscribe((data) => {
      this.featuredPostsData = data;

      for (let i = 0; i < 4; i++) {
        this.firstFourFeaturedPosts.push(this.featuredPostsData.data[i]);
      }
    });
  }

  redirectToRegister() {
    window.location.href = "/auth/register";
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/posts/${id}`;
  }
}
