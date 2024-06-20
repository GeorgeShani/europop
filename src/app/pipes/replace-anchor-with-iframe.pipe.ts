import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceAnchorWithIframe'
})
export class ReplaceAnchorWithIframePipe implements PipeTransform {

  transform(value: string, videoLink: string | null): string {
    if (!videoLink) {
      return value;
    }
    const anchorTagRegex = /<p><a[^>]+href="([^"]+)"[^>]*>[^<]+<\/a><\/p>/;
    const iframeTag = `<iframe src="${videoLink}" frameborder="0" allowfullscreen></iframe>`;
    return value.replace(anchorTagRegex, iframeTag);
  }
}
