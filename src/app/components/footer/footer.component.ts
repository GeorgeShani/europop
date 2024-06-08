import { Component } from '@angular/core';
import { externals } from '../../interfaces/external-links.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  europopLogo: string = "./../../../assets/images/europop-main-logo.svg";
  messengerLogo: string = "./../../../assets/images/messenger-logo.svg";
  decorationImage: string = "./../../../assets/images/footer-decoration.svg";
  userEmail!: string;

  socialMediaLinks: externals[] = [
    { imageUrl: "./../../../assets/images/instagram-logo.svg", linkUrl: "https://www.instagram.com/europop.ge" },
    { imageUrl: "./../../../assets/images/facebook-logo.svg", linkUrl: "https://www.facebook.com/europop.ge" },
    { imageUrl: "./../../../assets/images/youtube-logo.svg", linkUrl: "https://www.youtube.com/@europop_" },
    { imageUrl: "./../../../assets/images/tiktok-logo.svg", linkUrl: "https://www.tiktok.com/@europop.ge" }
  ]; 

  mobileStoreLinks: externals[] = [
    { imageUrl: "./../../../assets/images/appstore.png", linkUrl: "https://apps.apple.com/ge/app/europop-sports-news/id6480219097" },
    { imageUrl: "./../../../assets/images/googleplay.png", linkUrl: "https://play.google.com/store/apps/details?id=ge.europop.sport.news&hl=en_US" },
  ];

  redirectToMessenger(): void {
    window.open('https://m.me/1159313984168136', '_blank');
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
