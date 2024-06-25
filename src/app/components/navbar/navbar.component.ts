import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DDCategories } from '../../interfaces/drop-down-categories.model';
import { DDSubCategories } from '../../interfaces/drop-down-sub-categories.model';

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
export class NavbarComponent {
  @Input() modified!: boolean;

  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  georgianSport: string = "https://cdn.europop.ge/1090795a-c062-4604-b795-1b26227fc00b";
  kvaratskheliaNumber: string = "https://cdn.europop.ge/8b247cf1-fca5-48bf-a143-20b3ab2d9142";
  nakrebiLogo: string = "https://cdn.europop.ge/49472241-5caf-4fc8-90b5-cbf3e96f5232";

  searchQuery!: string;
  isToggled: boolean = false;

  selectedOption: string = "default";

  dropdownMenuData!: any;
  epopPlusMenuData!: any;

  listing: DDCategories[] = [
    { id: 180243, name: "ქართული ფეხბურთი", value: "default" },
    { id: 180249, name: "მსოფლიო ფეხბურთი", value: "world_football" },
    { id: 180261, name: "კალათბურთი", value: "basketball" },
    { id: 180274, name: "ქართული რაგბი", value: "goergian_rugby" },
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

  constructor(private _router: Router, private _fetch: FetchService) { }

  getSearchResults() {
    if (this.searchQuery) {
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

  toggleDropDown() {
    this.isToggled = !this.isToggled;
  }

  setSelectOption(option: string) {
    this.selectedOption = option;
  }

  redirectToCategory(id: number) {
    window.location.href = `/category/${id}`;
  }
}
