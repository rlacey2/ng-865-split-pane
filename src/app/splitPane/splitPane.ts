import { NgTemplateOutlet } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, NgZone, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'app-split-pane',
  templateUrl: './splitPane.html',
  styleUrls: ['./splitPane.scss'],
  imports: [NgTemplateOutlet]
})



export class SplitPaneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('splitWrapper') splitWrapper!: ElementRef<HTMLElement>;
  @ViewChild('leftPane') leftPane!: ElementRef<HTMLElement>;
  @ViewChild('verticalBar') verticalBar!: ElementRef<HTMLElement>;

  // Accept dynamic templates cleanly from outside inputs
  @Input() leftTemplate!: TemplateRef<any>;
  @Input() rightTemplate!: TemplateRef<any>;

   // Accept any valid CSS width string (percentage, px, rem, etc.)
  @Input() initialWidth: string = '50%'; 

    // Unique identifier to save/load from localStorage
  @Input() storageKey?: string; 

  private isDragging = false;
  private onMouseMoveRef = this.onMouseMove.bind(this);
  private onMouseUpRef = this.onMouseUp.bind(this);

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const bar = this.verticalBar.nativeElement;
    const left = this.leftPane.nativeElement;

        // Set the initial position right away when the view initializes
        /*
    if (this.initialWidth) {
      left.style.width = this.initialWidth;
    }
*/

        // 1. Try to load saved size from localStorage first
    let finalWidth = this.initialWidth;
    if (this.storageKey) {
      const savedWidth = localStorage.getItem(this.storageKey);
      if (savedWidth) {
        finalWidth = savedWidth;
      }
    }

    // Apply the resolved layout position
    left.style.width = finalWidth;

    this.zone.runOutsideAngular(() => {
      bar.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); 
        this.isDragging = true;
      });

      document.addEventListener('mousemove', this.onMouseMoveRef);
      document.addEventListener('mouseup', this.onMouseUpRef);
    });
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const wrapperRect = this.splitWrapper.nativeElement.getBoundingClientRect();
    let relativeX = e.clientX - wrapperRect.left;

    if (relativeX < 20) relativeX = 20;
    if (relativeX > wrapperRect.width - 20) relativeX = wrapperRect.width - 20;

    this.leftPane.nativeElement.style.width = `${relativeX}px`;
  }

  private onMouseUp(): void {
    this.isDragging = false;

       // Persist the layout change safely once the user stops dragging
    if (this.storageKey) {
      const currentWidth = this.leftPane.nativeElement.style.width;
      localStorage.setItem(this.storageKey, currentWidth);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMouseMoveRef);
    document.removeEventListener('mouseup', this.onMouseUpRef);
  }
}