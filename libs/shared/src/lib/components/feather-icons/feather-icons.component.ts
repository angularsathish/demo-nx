import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-nx-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss'],
})
export class FeatherIconsComponent {
  @Input() public icon: any;
  @Input() public class: any;
}
