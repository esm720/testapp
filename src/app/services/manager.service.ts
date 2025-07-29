import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private api = 'http://localhost:3000/managers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.api);
  }

  getById(id: number): Observable<Manager> {
    return this.http.get<Manager>(`${this.api}/${id}`);
  }

  create(manager: Partial<Manager>): Observable<Manager> {
    return this.http.post<Manager>(this.api, manager);
  }

  update(id: number, manager: Partial<Manager>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, manager);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
