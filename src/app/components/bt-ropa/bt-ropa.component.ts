import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-bt-ropa',
  imports: [],
  templateUrl: './bt-ropa.component.html',
  styleUrl: './bt-ropa.component.css'
})
export class BtRopaComponent{
  private _svgContent: string = '';
  sanitizedSvgContent: SafeHtml = '';
  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  @Input() set svgContent(value: string) {
    this._svgContent = value;
    this.sanitizedSvgContent = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  get svgContent(): string {
    return this._svgContent;
  }

}
