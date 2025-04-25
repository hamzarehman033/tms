import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class PaginatorComponent {
  @Input() pagination: any;
  @Input() pageNo: any;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() page_selected: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageNoChange: EventEmitter<number> = new EventEmitter<number>();
  
  pagesList: number[] = [10, 20, 25, 50, 100];
  showPaginator: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // this.showPaginator = (this.router.url === '/dashboard/u-m' || this.router.url === '/dashboard/QAI/form-history' );
      this.showPaginator = true;
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pagination.total_pages.length) {
      this.pageChange.emit(page);
    }
  }

  getVisiblePages(): number[] {
    const totalPages = this.pagination.total_pages.length;
    const currentPage = this.pagination.current_page;
    const maxVisiblePages = 5;
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
 
  pagesSelected(pages: number) {
    this.pageNo = pages;
    this.page_selected.emit(this.pageNo);
    this.pageNoChange.emit(this.pageNo);
  }
}
