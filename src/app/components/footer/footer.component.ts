import { Component } from '@angular/core';
import { externals } from '../../interfaces/external-links.model';
import { categories } from '../../interfaces/footer-categories.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  epopPlusLogo: string = "./../../../assets/images/eplus.png";
  messengerLogo: string = "./../../../assets/images/messenger-logo.svg";
  decorationImage: string = "./../../../assets/images/footer-decoration.svg";
  userEmail!: string;

  categories: categories[] = [
    { id: 180243, link: "", name: "ფეხბურთი" },
    { id: 180244, link: "", name: "ეროვნული ლიგა" },
    { id: 180246, link: "", name: "ეროვნული ნაკრები" },
    { id: 180300, link: "", name: "სხვა სახეობები" },
    { id: 180247, link: "", name: "ლეგიონერები" },
    { id: 180248, link: "", name: "ფუტსალი" }
  ];

  analytics: categories[] = [
    { id: 0, link: "/posts/analytics", name: "ანალიტიკა" },
    { id: 0, link: "/", name: "ისტორია" },
    { id: 0, link: "/", name: "ინტერვიუ" },
    { id: 0, link: "/", name: "ქვიზი" },
    { id: 0, link: "/", name: "ბლოგი" }
  ];

  help: categories[] = [
    { id: 0, link: "/", name: "ელ-ფოსტა" },
    { id: 0, link: "/privacy-policy", name: "კონფიდენციალურობა" },
    { id: 0, link: "/terms-and-conditions", name: "წესები და პირობები" },
    { id: 0, link: "/", name: "კონტაქტი" },
    { id: 0, link: "/about-us", name: "ჩვენ შესახებ" }
  ];

  profile: string[] = ["ჩემი პროფილი", "ჩემი ინტერესები", "პარამეტრები", "შენახული"];

  socialMediaLinks: externals[] = [
    { name: "", imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { name: "", imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { name: "", imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { name: "", imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ]; 

  mobileStoreLinks: externals[] = [
    { name: "", imageUrl: "./../../../assets/images/appstore.png", linkUrl: "https://apps.apple.com/ge/app/europop-sports-news/id6480219097" },
    { name: "", imageUrl: "./../../../assets/images/googleplay.png", linkUrl: "https://play.google.com/store/apps/details?id=ge.europop.sport.news&hl=en_US" },
  ];

  redirectToMessenger(): void {
    window.open('https://m.me/1159313984168136', '_blank');
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
