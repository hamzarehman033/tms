import { Component, Input, ElementRef, OnChanges, SimpleChanges, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { IconifyIcon } from '@iconify/types';
import { iconToSVG, replaceIDs } from '@iconify/utils';
import { loadIcon } from '@iconify/iconify';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-icon',
  template: '<span #container></span>'
})
export class IconComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() icon!: IconifyIcon | string;
  @Input() width?: string | number = 24;
  @Input() height?: string | number = 24;
  @Input() color?: string;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateIcon();
    }
  }

  ngOnInit() {
    // this.updateIcon();
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.updateIcon();
  }

  private async updateIcon() {
    if (!this.icon) return;
    
    const container = this.elementRef.nativeElement.querySelector('span');
    
    try {
      let iconData: IconifyIcon;
      
      // Check if icon is a string (icon name) or an IconifyIcon object
      if (typeof this.icon === 'string') {
        // Load icon by name
        iconData = await loadIcon(this.icon);
        if (!iconData) {
          console.error(`Icon "${this.icon}" not found`);
          return;
        }
      } else {
        // Already an IconifyIcon object
        iconData = this.icon;
      }
      
      // Convert icon to SVG data
      const renderData = iconToSVG(iconData, {
        width: this.width ? this.width.toString() : '24',
        height: this.height ? this.height.toString() : '24',
      });
      
      // Create SVG element
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      // Add attributes
      const attributes = renderData.attributes;
      if (attributes.width) svgElement.setAttribute('width', attributes.width);
      if (attributes.height) svgElement.setAttribute('height', attributes.height);
      svgElement.setAttribute('viewBox', attributes.viewBox);
      
      if (this.color) {
        svgElement.setAttribute('color', this.color);
      }
      
      // Add content with replaced IDs
      svgElement.innerHTML = replaceIDs(renderData.body);
      
      // Clear container and append new SVG
      container.innerHTML = '';
      container.appendChild(svgElement);
    } catch (error) {
      console.error('Error rendering icon:', error);
    }
  }
}