import { Component, EffectRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DataService } from '../services/data.service';
import { Category } from '../models/category';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SpinnerComponent,
    FormsModule,
    ScrollingModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);
  categories!: Category[];
  selectedCategoryId = signal<string | null>(null);
  books = signal<any[]>([]);
  loading = signal(false);
  search = signal<string | null>(null);

  effectSig!: EffectRef;

  ngOnInit(): void {
    this.loading.set(true);
    this.dataService.getCategories().subscribe({
      next: (categories) => {
        this.loading.set(false);
        this.categories = categories;
      },
    });
    this.dataService.getBooksByCategory('').subscribe({
      next: (books) => {
       // this.selectedCategoryId.set(category.id);
        this.loading.set(false);
        this.books.set(books);
      },
    });
  }

  setCategory(category: Category): void {
    this.selectedCategoryId.set(null);
    this.loading.set(true);
    this.dataService.getBooksByCategory(category.id).subscribe({
      next: (books) => {
        this.selectedCategoryId.set(category.id);
        this.loading.set(false);
        this.books.set(books);
      },
    });
  }

  async searchBooks(): Promise<void> {
    if (!this.search()) {
      return;
    }
    this.loading.set(true);
    if (this.selectedCategoryId()) {
      this.dataService
        .searchBookByCategory(this.selectedCategoryId(), this.search())
        .subscribe({
          next: (books) => {
            this.loading.set(false);
            this.books.set(books);
          },
        });
    }
  }

  goToBookDetails(book: any): void {
    this.router.navigateByUrl('book' + book.id);
  }
}
