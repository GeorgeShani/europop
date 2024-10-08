import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

declare var twttr: any;
declare var instgrm: any;
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class ExternalContentExtractorService {
  constructor(private _http: HttpClient) { }

  private providers: { [key: string]: string } = {
    'youtube.com': 'https://www.youtube.com/oembed',
    'youtu.be': 'https://www.youtube.com/oembed',
    'twitter.com': 'https://publish.twitter.com/oembed',
    'vimeo.com': 'https://vimeo.com/api/oembed.json',
    'flickr.com': 'https://www.flickr.com/services/oembed',
    'instagram.com': 'https://graph.facebook.com/v10.0/instagram_oembed',
    'facebook.com': 'https://graph.facebook.com/v10.0/oembed_post'
  };

  extractVideoLink(htmlContent: string): string | null {
    const regex = /https:\/\/cdn\.jwplayer\.com\/previews\/[A-Za-z0-9\-]+/;
    const match = htmlContent.match(regex);
    return match ? match[0] : null;
  }

  extractOEmbedContent(htmlContent: string): string | null {
    const regex = /<oembed\s+url="([^"]+)"\s*><\/oembed>/;
    const match = regex.exec(htmlContent);
    return match ? match[1] : null;
  }

  getOembedData(oembedUrl: string): Observable<any> {
    const provider = this.getProvider(oembedUrl);
    if (!provider) {
      throw new Error('No oEmbed provider found for the given URL');
    }

    if (provider.includes('publish.twitter.com')) {
      const twitterEmbedHtml = `
        <blockquote class="twitter-tweet">
          <a href="${oembedUrl}"></a>
        </blockquote>
      `;
      
      this.loadScript("twitter-widgets-script", "https://platform.twitter.com/widgets.js");
      
      const loadTwitterWidgets = () => {
        if (typeof twttr !== 'undefined' && twttr.widgets) {
          twttr.widgets.load();
        } else {
          setTimeout(loadTwitterWidgets, 50);
        }
      };

      loadTwitterWidgets();
      return of({ html: twitterEmbedHtml });
    }


    if (provider.includes('https://graph.facebook.com/v10.0/instagram_oembed')) {
      const instagramHtml = `
        <blockquote class="instagram-media" data-instgrm-permalink="${oembedUrl}" data-instgrm-version="13">
          <a href="${oembedUrl}"></a>
        </blockquote>
      `;

      this.loadScript("instagram-embed-script", "https://www.instagram.com/embed.js");
      
      const loadInstagramEmbeds = () => {
        if (typeof instgrm !== 'undefined' && instgrm.Embeds) {
          instgrm.Embeds.process();
        } else {
          setTimeout(loadInstagramEmbeds, 50);
        }
      };

      loadInstagramEmbeds();
      return of({ html: instagramHtml });
    }


    if (provider.includes('https://graph.facebook.com/v10.0/oembed_post')) {
      let facebookHtml: string;

      if (oembedUrl.includes('/videos/')) {
        facebookHtml = `
          <div class="fb-video" data-href="${oembedUrl}" data-width="500" data-show-text="false"></div>
        `;
      } else {
        facebookHtml = `
          <div class="fb-post" data-href="${oembedUrl}" data-width="500" style="background-color: #ffffff; color: #000000;"></div>
        `;
      }

      this.loadScript("facebook-jssdk", "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0");
      
      const loadFacebookEmbeds = () => {
        if (typeof FB !== 'undefined' && FB.XFBML) {
          FB.XFBML.parse();
        } else {
          setTimeout(loadFacebookEmbeds, 50);
        }
      };

      loadFacebookEmbeds();
      return of({ html: facebookHtml });
    }

    const oembedEndpoint = `${provider}?url=${encodeURIComponent(oembedUrl)}`;
    return this._http.get(oembedEndpoint);
  }

  private loadScript(scriptId: string, scriptSrc: string): void {
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }

  private getProvider(url: string): string | null {
    const hostname = new URL(url).hostname;

    for (const key of Object.keys(this.providers)) {
      if (hostname.includes(key)) {
        return this.providers[key];
      }
    }

    return null;
  }
}