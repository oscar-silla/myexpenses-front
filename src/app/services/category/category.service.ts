import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@capacitor/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { SecureStorageService } from '../storage/secure-storage.service';
import { BASE_URL } from '../../../utils/app-constants';
import { CategoriesResponse } from '../../types/models/response/category/categories-response-type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http: HttpClient = inject(HttpClient);
  private storage: SecureStorageService = inject(SecureStorageService);
  private baseUrl: string = BASE_URL;

  private getHeaders(): Observable<{ headers: HttpHeaders }> {
    return from(this.storage.getItem('token')).pipe(
      map((token) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
    );
  }

  public getCategories(): Observable<CategoriesResponse> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.get<CategoriesResponse>(`${this.baseUrl}/categories`, headers)
      )
    );
  }
}
