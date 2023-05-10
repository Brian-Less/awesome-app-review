import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
    pure: false
})
export class HighlightPipe implements PipeTransform {
    constructor(private domSanitizer: DomSanitizer) { }

    transform(text, key): SafeHtml {
        if (!key) {
          return this.domSanitizer.bypassSecurityTrustHtml(text);
        }
        if (text != null) {
          return this.domSanitizer.bypassSecurityTrustHtml(text.replace(new RegExp(key, 'gi'), (match) => {
            return '<span class="text-red-600">' + match + '</span>';
          }));
        }
      }
      /* 
    transform(text: string, keys: string[]): SafeHtml {
        if (!keys || keys.length == 0) {
            return this.domSanitizer.bypassSecurityTrustHtml(text);
        }
        if (text != null) {
            let regex = new RegExp(keys.join("|"), "gi");
            return this.domSanitizer.bypassSecurityTrustHtml(
                text.replace(regex, (match) => {
                    return '<span class="text-yellow-600">' + match + '</span>';
                })
            );
        }
        return this.domSanitizer.bypassSecurityTrustHtml(text);
    } */
}
