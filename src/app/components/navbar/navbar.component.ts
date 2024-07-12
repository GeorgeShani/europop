import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { DDCategories } from '../../interfaces/drop-down-categories.model';
import { DDSubCategories } from '../../interfaces/drop-down-sub-categories.model';
import { externals } from '../../interfaces/external-links.model';
import { RegexService } from '../../services/regex.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ height: 0 }),
        animate('0.35s cubic-bezier(0.55, 0.06, 0.88, 0.28)', style({ height: 542 }))
      ]),
      transition(':leave', [
        animate('0.35s cubic-bezier(0.55, 0.06, 0.88, 0.28)', style({ height: 0 }))
      ])
    ]),
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  @Input() modified!: boolean;

  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  georgianSport: string = "https://cdn.europop.ge/1090795a-c062-4604-b795-1b26227fc00b";
  kvaratskheliaNumber: string = "https://cdn.europop.ge/8b247cf1-fca5-48bf-a143-20b3ab2d9142";
  nakrebiLogo: string = "https://cdn.europop.ge/49472241-5caf-4fc8-90b5-cbf3e96f5232";

  searchQuery!: string;
  
  isToggled: boolean = false;
  isEpopPlusMenuToggled: boolean = false;

  email: string = "";
  message: string = "";
  emailError: string = "";

  userEmail!: string;

  selectedOption: string = "default";

  defaultCategoryPosts!: any;
  worldFootballCategoryPosts!: any;
  basketballCategoryPosts!: any;
  georgianRugbyCategoryPosts!: any;
  MMACategoryPosts!: any;
  judoCategoryPosts!: any;
  othersCategoryPosts!: any;

  socialMediaLinks: externals[] = [
    { name: "Instagram", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "Facebook", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "Youtube", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "Tiktok", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" },
    { name: "მესენჯერი", imageUrl: "./../../../assets/images/messenger-logo.svg", linkUrl: "https://m.me/1159313984168136" }
  ];

  listing: DDCategories[] = [
    { id: 180243, name: "ქართული ფეხბურთი", value: "default" },
    { id: 180249, name: "მსოფლიო ფეხბურთი", value: "world_football" },
    { id: 180261, name: "კალათბურთი", value: "basketball" },
    { id: 180274, name: "ქართული რაგბი", value: "georgian_rugby" },
    { id: 181216, name: "MMA", value: "MMA" },
    { id: 180294, name: "ძიუდო", value: "judo" },
    { id: 180300, name: "სხვა სახეობები", value: "others" },
  ];

  defaultSubListing: DDSubCategories = {
    mainId: 180243,
    mainTitle: "ქართული ფეხბურთი",
    subCategoryList: [
      { id: 180247, name: "ლეგიონერები" },
      { id: 180244, name: "ეროვნული ლიგა" },
      { id: 180245, name: "საქართველოს თასი" },
      { id: 180248, name: "ფუტსალი" },
      { id: 180246, name: "ეროვნული ნაკრები" },
      { id: 180497, name: "ასაკობრივი ნაკრებები" }
    ]
  };

  worldFootballSubListing: DDSubCategories = {
    mainId: 180249,
    mainTitle: "მსოფლიო ფეხბურთი",
    subCategoryList: [
      { id: 180250, name: "ჩემპიონთა ლიგა" },
      { id: 180251, name: "ევროპალიგა" },
      { id: 180258, name: "მსოფლიოს ჩემპიონატი" },
      { id: 180255, name: "იტალია" },
      { id: 180252, name: "ინგლისი" },
      { id: 180254, name: "გერმანია" },
      { id: 180253, name: "ესპანეთი" },
      { id: 180256, name: "საფრანგეთი" },
      { id: 180260, name: "კოპა ამერიკა" },
      { id: 180346, name: "ერთა ლიგა" },
      { id: 183057, name: "კონფერენსლიგა" },
      { id: 180259, name: "ევროპის ჩემპიონატი" }
    ]
  };

  basketballSubListing: DDSubCategories = {
    mainId: 180261,
    mainTitle: "კალათბურთი",
    subCategoryList: [
      { id: 180262, name: "ქართული კალათბურთი" },
      { id: 180263, name: "მსოფლიო კალათბურთი" }
    ]
  };

  georgianRugbySubListing: DDSubCategories = {
    mainId: 180274,
    mainTitle: "ქართული რაგბი",
    subCategoryList: [
      { id: 180276, name: "დიდი ათი" },
      { id: 180277, name: "ბორჯღალოსნები" },
      { id: 180278, name: "სარაგბო ასაკობრივი ნაკრებები" },
      { id: 180279, name: "სარაგბო ლეგიონი" },
      { id: 181008, name: "ბორჯღალოსნები" }
    ]
  };

  MMASubListing: DDSubCategories = {
    mainId: 181216,
    mainTitle: "MMA",
    subCategoryList: [
      { id: 180647, name: "UFC" },
      { id: 183668, name: "GFC" }
    ]
  };

  judoSubListing: DDSubCategories = {
    mainId: 180294,
    mainTitle: "ძიუდო",
    subCategoryList: [
      { id: 180790, name: "ქართული ძიუდო" },
      { id: 182207, name: "მსოფლიო ძიუდო" },
      { id: 182331, name: "ძიუდოს ევროპის ჩემპიონატი" },
      { id: 182922, name: "ძიუდოს მსოფლიო ჩემპიონატი" },
      { id: 183718, name: "თბილისის გრანდ სლემი" }
    ]
  };

  othersSubListing: DDSubCategories = {
    mainId: 180300,
    mainTitle: "სხვა სახეობები",
    subCategoryList: [
      { id: 180304, name: "კრივი" },
      { id: 180313, name: "ფარიკაობა" },
      { id: 180306, name: "ხელბურთი" },
      { id: 180308, name: "წყალბურთი" },
      { id: 180309, name: "ფიგურული სრიალი" },
      { id: 180301, name: "ფორმულა 1" },
      { id: 180302, name: "ჭადრაკი" },
      { id: 180303, name: "ჰოკეი" },
      { id: 180310, name: "მძლეოსნობა" },
      { id: 180311, name: "ტყვიის სროლა" },
      { id: 180316, name: "ზამთრის სახეობები" },
      { id: 180331, name: "ავტოსპორტი" },
      { id: 180539, name: "ძალოსნობა" },
      { id: 180837, name: "ქართული სპორტი" }
    ]
  };

  constructor(
    private _router: Router,
    private _fetch: FetchService,
    private _regex: RegexService
  ) { }
  
  ngOnInit(): void {
    this._fetch.getPostsByCategory(this.defaultSubListing.mainId).subscribe((data) => {
      this.defaultCategoryPosts = data;

      if (this.defaultCategoryPosts.data.length > 4) {
        this.defaultCategoryPosts.data = this.defaultCategoryPosts.data.slice(0, 4);
      }
    });

    this._fetch.getPostsByCategory(this.worldFootballSubListing.mainId).subscribe((data) => {
      this.worldFootballCategoryPosts = data;

      if (this.worldFootballCategoryPosts.data.length > 4) {
        this.worldFootballCategoryPosts.data = this.worldFootballCategoryPosts.data.slice(0, 4);
      }
    });

    this._fetch.getPostsByCategory(this.basketballSubListing.mainId).subscribe((data) => {
      this.basketballCategoryPosts = data;

      if (this.basketballCategoryPosts.data.length > 4) {
        this.basketballCategoryPosts.data = this.basketballCategoryPosts.data.slice(0, 4);
      }
    });

    this._fetch.getPostsByCategory(this.georgianRugbySubListing.mainId).subscribe((data) => {
      this.georgianRugbyCategoryPosts = data;

      if (this.georgianRugbyCategoryPosts.data.length > 4) {
        this.georgianRugbyCategoryPosts.data = this.georgianRugbyCategoryPosts.data.slice(0, 4);
      }
    });

    this._fetch.getPostsByCategory(this.MMASubListing.mainId).subscribe((data) => {
      this.MMACategoryPosts = data;

      if (this.MMACategoryPosts.data.length > 4) {
        this.MMACategoryPosts.data = this.MMACategoryPosts.data.slice(0, 4);
      }
    });

    this._fetch.getPostsByCategory(this.judoSubListing.mainId).subscribe((data) => {
      this.judoCategoryPosts = data;

      if (this.judoCategoryPosts.data.length > 4) {
        this.judoCategoryPosts.data = this.judoCategoryPosts.data.slice(0, 4);
      }
    });

    this._fetch.getPostsByCategory(this.othersSubListing.mainId).subscribe((data) => {
      this.othersCategoryPosts = data;

      if (this.othersCategoryPosts.data.length > 4) {
        this.othersCategoryPosts.data = this.othersCategoryPosts.data.slice(0, 4);
      }
    });
  }

  getSearchResults() {
    if (this.searchQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      this._router.navigate(['/search'], {
        queryParams: {
          query: this.searchQuery
        }
      });
    }
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getSearchResults();
    }
  }

  checkEmail() {
    if (this.email === "") {
      this.emailError = "გთხოვთ შეავსოთ მეილის ველი";
      return;
    } else if (!this._regex.validateEmail(this.email)) {
      this.emailError = "ელ-ფოსტის ფორმატი არასწორია";
    } else {
      this.emailError = "";
    }
  }

  checkEmailAndMessage() {
    if (this.email && this.message) { 
      if (this._regex.validateEmail(this.email) && this.message.length <= 150) {
        alert("თქვენი მესიჯი წარმატებულად გაიგზავნა");
        this.email = "";
        this.message = "";
      } else if (!this._regex.validateEmail(this.email)) {
        this.emailError = "ელ-ფოსტის ფორმატი არასწორია";
      } else if (this.message.length > 150) { 
        alert("მესიჯი აჭარბებს მაქსიმალური სიმბოლოების რაოდენობას");
      }
    }
  }

  checkIfBeyond150Chars() {
    return { 'color': this.message.length > 150 ? '#FF3B3B' : 'rgba(255, 255, 255, 0.7)' };
  }

  toggleDropDown() {
    this.isToggled = !this.isToggled;
  }

  setSelectOption(option: string) {
    this.selectedOption = option;
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

  redirectToCategory(id: number) {
    window.location.href = `/category/${id}`;
  }

  redirectToPostDetails(id: number) {
    window.location.href = `/post/${id}`;
  }
}
