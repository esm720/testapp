import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-list.component.html'
})
export class StoreListComponent implements OnInit {
  stores: Store[] = [];

  constructor(
    private svc: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(data => this.stores = data);
  }

  add() {
    this.router.navigate(['/stores/new']);
  }

  edit(id: number) {
    this.router.navigate(['/stores/edit', id]);
  }

  delete(id: number) {
    if (!confirm('Delete this store?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}