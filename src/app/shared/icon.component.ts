import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span class="icon" [innerHTML]="svg" [style.width.px]="size" [style.height.px]="size" [style.color]="color"></span>`,
  styles: [
    `
      .icon {
        display: inline-flex;
        flex-shrink: 0;
      }
      .icon :global(svg),
      .icon ::ng-deep svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class IconComponent {
  @Input() name = 'house';
  @Input() size = 20;
  @Input() color = 'currentColor';

  get svg(): SafeHtml {
    const d = ICONS[this.name] ?? ICONS['house'];
    const html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor(private sanitizer: DomSanitizer) {}
}
