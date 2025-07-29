import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private api = 'http://localhost:3000/stores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Store[]> {
    return this.http.get<Store[]>(this.api);
  }

  getById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.api}/${id}`);
  }

  create(store: Partial<Store>): Observable<Store> {
    return this.http.post<Store>(this.api, store);
  }

  update(id: number, store: Partial<Store>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, store);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}