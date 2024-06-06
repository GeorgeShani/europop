import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(value).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSec < 60) {
      return `${diffSec} წამის წინ`;
    } else if (diffMin < 60) {
      return `${diffMin} წუთის წინ`;
    } else if (diffHrs < 24) {
      return `${diffHrs} საათის წინ`;
    } else if (diffDays < 7) {
      return `${diffDays} დღის წინ`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} კვირის წინ`;
    } else if (diffMonths < 12) {
      return `${diffMonths} თვის წინ`;
    } else {
      return `${diffYears} წლის წინ`;
    }
  }
}
