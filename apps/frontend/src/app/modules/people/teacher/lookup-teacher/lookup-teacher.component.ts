import { Component, OnInit } from '@angular/core';
import { TableButtonAction } from '@demo-nx/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-nx-lookup-teacher',
  templateUrl: './lookup-teacher.component.html',
  styleUrls: ['./lookup-teacher.component.scss'],
})
export class LookupTeacherComponent implements OnInit {
  columns = [
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'date', header: 'Date' },
    { columnDef: 'company', header: 'Company' },
    { columnDef: 'country', header: 'Country' },
    { columnDef: 'city', header: 'City' },
    { columnDef: 'phone', header: 'Phone' },
  ];
  data: any[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.data = [
      {
        name: 'Molly Pope',
        date: 'Jul 27, 2021',
        company: 'Faucibus Orci Institute',
        country: 'New Zealand',
        city: 'Campinas',
        phone: '1-403-634-0276',
      },
      {
        name: 'Alfonso Vinson',
        date: 'May 11, 2021',
        company: 'Non Ante Corp.',
        country: 'United Kingdom',
        city: 'Redlands',
        phone: '1-405-411-6336',
      },
      {
        name: 'Camden David',
        date: 'Aug 6, 2022',
        company: 'Cursus Et LLP',
        country: 'Nigeria',
        city: 'Iguala',
        phone: '(415) 628-6853',
      },
      {
        name: 'Levi Goff',
        date: 'Nov 3, 2021',
        company: 'Vitae Incorporated',
        country: 'Sweden',
        city: 'Manavgat',
        phone: '1-545-823-7985',
      },
      {
        name: 'Madaline Leach',
        date: 'Jun 13, 2022',
        company: 'Erat Volutpat Corp.',
        country: 'Chile',
        city: 'Niterói',
        phone: '1-678-156-9674',
      },
      {
        name: 'Camden David',
        date: 'Aug 6, 2022',
        company: 'Cursus Et LLP',
        country: 'Nigeria',
        city: 'Iguala',
        phone: '(415) 628-6853',
      },
      {
        name: 'Levi Goff',
        date: 'Nov 3, 2021',
        company: 'Vitae Incorporated',
        country: 'Sweden',
        city: 'Manavgat',
        phone: '1-545-823-7985',
      },
      {
        name: 'Madaline Leach',
        date: 'Jun 13, 2022',
        company: 'Erat Volutpat Corp.',
        country: 'Chile',
        city: 'Niterói',
        phone: '1-678-156-9674',
      },
    ];
  }
  onTableAction(event: TableButtonAction) {
    const rolename = this.router.url.split('/')[1]
      ? this.router.url.split('/')[1]
      : '';
    console.log('event', event);
    switch (event.name) {
      case 'ADD':
        this.router.navigate(['/' + rolename + '/people/teacher/add']);
        break;

      case 'EDIT':
        this.router.navigate(['/' + rolename + '/people/teacher/add']);
        break;

      case 'VIEW':
        this.router.navigate(['/' + rolename + '/people/teacher/profile']);
        break;

      case 'DELETE':
        break;

      default:
        break;
    }
  }
}
