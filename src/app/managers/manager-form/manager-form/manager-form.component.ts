import { Component, OnInit }                 from '@angular/core';
import { CommonModule }                      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { ManagerService } from '../../../services/manager.service';
import { Manager }        from '../../../models/manager.model';
import { StoreService }   from '../../../services/store.service';
import { Store }          from '../../../models/store.model';

@Component({
  selector: 'app-manager-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manager-form.component.html'
})
export class ManagerFormComponent implements OnInit {
  form: FormGroup;
  id: number|null = null;
  stores: Store[] = [];

  constructor(
    fb: FormBuilder,
    private svc: ManagerService,
    private storeSvc: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      storeId:   [null,   Validators.required],
    });
  }

  ngOnInit() {
    // load store dropdown
    this.storeSvc.getAll().subscribe(list => this.stores = list);

    // if editing, patch values
    this.route.paramMap.subscribe(m => {
      const param = m.get('id');
      if (param) {
        this.id = +param;
        this.svc.getById(this.id).subscribe((man: Manager) => {
          this.form.patchValue(man);
        });
      }
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.value as Partial<Manager>;

    if (this.id) {
      // update returns Observable<void>
      this.svc.update(this.id, payload)
        .subscribe(() => this.router.navigate(['/managers']));
    } else {
      // create returns Observable<Manager>
      this.svc.create(payload)
        .subscribe(() => this.router.navigate(['/managers']));
    }
  }
  cancel() {
    this.router.navigate(['/managers']);
  }
}