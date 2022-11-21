import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@demo-nx/material';
import { SharedModule } from '@demo-nx/shared';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';

import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { TableCellComponent } from './table-cell/table-cell.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatPaginatorModule,
    SharedModule,
    MatTableExporterModule,
  ],
  declarations: [DynamicTableComponent, TableCellComponent],
  exports: [DynamicTableComponent],
})
export class DynamicTableModule {}
