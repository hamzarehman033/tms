import { Component, Input, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IconifyIcon } from '@iconify/types';
import { iconToSVG, replaceIDs } from '@iconify/utils';

@Component({
  selector: 'app-icon',
  template: '<span #container></span>'
})
export class IconComponent implements OnChanges, OnInit {
  @Input() icon!: IconifyIcon;
  @Input() width?: string | number = 24;
  @Input() height?: string | number = 24;
  @Input() color?: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateIcon();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateIcon();
  }

  private updateIcon() {
    if (!this.icon) return;
    
    const container = this.elementRef.nativeElement.querySelector('span');
    
    // Convert icon to SVG data
    const renderData = iconToSVG(this.icon, {
      width: this.width ? this.width.toString() : '24',
      height: this.height ? this.height.toString() : '24',
    });
    
    // Create SVG element
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    
    // Add attributes
    const attributes = renderData.attributes;
    Object.keys(attributes).forEach(attr => {
      svgElement.setAttribute(attr, (attributes as any)[attr]);
    });
    
    // Add content with replaced IDs
    svgElement.innerHTML = replaceIDs(renderData.body);
    
    // Clear container and append new SVG
    container.innerHTML = '';
    container.appendChild(svgElement);
  }
}