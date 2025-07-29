import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private api = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.api);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}/${id}`);
  }

  create(employee: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.api, employee);
  }

  update(id: number, employee: Partial<Employee>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
