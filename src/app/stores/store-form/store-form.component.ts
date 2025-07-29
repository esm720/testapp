import { Component, OnInit }                from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }              from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { Store }        from '../../models/store.model';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './store-form.component.html'
})
export class StoreFormComponent implements OnInit {
  form: FormGroup;
  id: number|null = null;

  constructor(
    fb: FormBuilder,
    private svc: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = fb.group({
      name:    ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(m => {
      const maybeId = m.get('id');
      if (maybeId) {
        this.id = +maybeId;
        this.svc.getById(this.id).subscribe(store => this.form.patchValue(store));
      }
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.value;
    if (this.id) {
      this.svc.update(this.id, payload).subscribe(() => this.router.navigate(['/stores']));
    } else {
      this.svc.create(payload).subscribe(() => this.router.navigate(['/stores']));
    }
  }

  cancel() {
    this.router.navigate(['/stores']);
  }
}
