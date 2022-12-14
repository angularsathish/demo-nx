import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-nx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() title: string;
  @Input() items: any[];
  @Input() active_item: string;
}
