import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { CommonModule }      from '@angular/common';

import { EmployeeService } from '../../../services/employee.service';
import { Employee }        from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private svc: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(data => this.employees = data);
  }

  add() {
    this.router.navigate(['/employees/new']);
  }

  edit(id: number) {
    this.router.navigate(['/employees/edit', id]);
  }

  delete(id: number) {
    if (!confirm('Delete this employee?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
