import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ObservedValuesFromArray, map, of } from 'rxjs';
import { Category } from '../models/category';
import { GOOGLE_BOOKS_API_URL } from '../api';

const CATEGORIES = [
  {
    id: 'architecture',
    name: 'Architecture',
  },
  {
    id: 'art',
    name: 'Art',
  },
  {
    id: 'bibles',
    name: 'Bibles',
  },
  {
    id: 'computers',
    name: 'Computers',
  },
  {
    id: 'design',
    name: 'Design',
  },
  {
    id: 'education',
    name: 'Education',
  },
  {
    id: 'fiction',
    name: 'Fiction',
  },
  {
    id: 'history',
    name: 'History',
  },
  {
    id: 'cooking',
    name: 'Cooking',
  },
  {
    id: 'law',
    name: 'Law',
  },
  {
    id: 'music',
    name: 'Music',
  },
  {
    id: 'travel',
    name: 'Travel',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  getBooks(): Observable<any> {
    return this.http.get(
      'https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub'
    );
  }

  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  getBooksByCategory(category: string | undefined): Observable<any> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        q: `subject:art`,
      },
    });
    return this.http
      .get(`${GOOGLE_BOOKS_API_URL}`, { params: params })
      .pipe(map((res: any) => res.items));
  }

  searchBookByCategory(
    category: string | null,
    searchTerm: string | null
  ): Observable<any> {
    let params = `subject:${category}+intitle:${searchTerm}`;
    return this.http
      .get(`${GOOGLE_BOOKS_API_URL}?q=${params}`)
      .pipe(map((res: any) => res.items));
  }
}
