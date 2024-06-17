import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

declare var twttr: any;

@Injectable({
  providedIn: 'root'
})
export class ExternalContentExtractorService {
  renderer: any;
  constructor(private _http: HttpClient) {}
  
  private providers: { [key: string]: string } = {
    'youtube.com': 'https://www.youtube.com/oembed',
    'youtu.be': 'https://www.youtube.com/oembed',
    'twitter.com': 'https://publish.twitter.com/oembed',
    'vimeo.com': 'https://vimeo.com/api/oembed.json',
    'flickr.com': 'https://www.flickr.com/services/oembed',
    'instagram.com': 'https://graph.facebook.com/v10.0/instagram_oembed'
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
      const twitterEmbedHtml = `<blockquote class="twitter-tweet"><a href="${oembedUrl}"></a></blockquote>`;
      if (twttr.widgets) twttr.widgets.load(); 
      return of({ html: twitterEmbedHtml });
    }
    
    const oembedEndpoint = `${provider}?url=${encodeURIComponent(oembedUrl)}`;
    return this._http.get(oembedEndpoint);
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
