import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TableButtonAction, TableColumn } from '@demo-nx/interfaces';
import { UnsubscribeOnDestroyAdapter } from '@demo-nx/material';

@Component({
  selector: 'demo-nx-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() action: EventEmitter<TableButtonAction | string> = new EventEmitter<
    TableButtonAction | string
  >();
  @Input() columns: Array<TableColumn>;
  @Input() set dataset(data: Array<any>) {
    this.dataSource = new MatTableDataSource<any>(data);
  }
  @Input() pageName: string;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  value: string;

  ngOnInit(): void {
    // set checkbox column
    this.displayedColumns.push('select');

    // set table columns
    this.displayedColumns = this.displayedColumns.concat(
      this.columns.map((x) => x.columnDef)
    ); // pre-fix static

    // add action column
    this.displayedColumns.push('action');

    // set pagination
    this.dataSource.paginator = this.paginator;
  }

  onTableAction(e: string, row?: any): void {
    const emitObj: TableButtonAction = {
      name: e,
      value: row,
    };
    this.action.emit(emitObj);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.dataSource.filter = '';
  }
}
