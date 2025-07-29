import { Component, OnInit }                 from '@angular/core';
import { CommonModule }                      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../../services/employee.service';
import { Employee }        from '../../../models/employee.model';
import { Manager } from '../../../models/manager.model';
import { ManagerService } from '../../../services/manager.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  id: number|null = null;
  managers: Manager[] = [];

  constructor(
    fb: FormBuilder,
    private svc: EmployeeService,
    private mgrSvc: ManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      position:  ['', Validators.required],
      managerId: [null, Validators.required],
    });
  }

  ngOnInit() {
    // load manager dropdown
    this.mgrSvc.getAll().subscribe(list => this.managers = list);

    this.route.paramMap.subscribe(m => {
      const p = m.get('id');
      if (p) {
        this.id = +p;
        this.svc.getById(this.id).subscribe((emp: Employee) => {
          this.form.patchValue(emp);
        });
      }
    });
  }

save() {
  if (this.form.invalid) return;
  const payload = this.form.value as Partial<Employee>;

  if (this.id) {
    this.svc.update(this.id, payload)
      .subscribe(() => this.router.navigate(['/employees']));
  } else {
    this.svc.create(payload)
      .subscribe(() => this.router.navigate(['/employees']));
  }
}
  cancel() {
    this.router.navigate(['/employees']);
  }
}