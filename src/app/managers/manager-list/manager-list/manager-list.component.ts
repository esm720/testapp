import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { CommonModule }      from '@angular/common';

import { ManagerService } from '../../../services/manager.service';
import { Manager }        from '../../../models/manager.model';

@Component({
  selector: 'app-manager-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-list.component.html'
})
export class ManagerListComponent implements OnInit {
  managers: Manager[] = [];

  constructor(
    private svc: ManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(data => this.managers = data);
  }

  add() {
    this.router.navigate(['/managers/new']);
  }

  edit(id: number) {
    this.router.navigate(['/managers/edit', id]);
  }

  delete(id: number) {
    if (!confirm('Delete this manager?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
