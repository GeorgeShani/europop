import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {
  private monthsGeorgian = [
    "იან", "თებ", "მარ", "აპრ", "მაი", "ივნ",
    "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"
  ];
  
  transform(value: Date | string): string {
    console.log('Original value:', value);

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', value);
      return 'Invalid date';
    }

    const now = new Date();
    const diffMs = now.getTime() - new Date(value).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);

    if (diffSec < 60) {
      return `${diffSec} წამის წინ`;
    } else if (diffMin <= 60) {
      return `${diffMin} წუთის წინ`;
    } else if (diffHrs <= 24) {
      return `${diffHrs} საათის წინ`;
    } else {
      const publicationDate = new Date(value);
      const day = publicationDate.getDate();
      const month = this.monthsGeorgian[publicationDate.getMonth()];
      const year = publicationDate.getFullYear();
      return `${day} ${month} ${year}`;
    }
  }
}
