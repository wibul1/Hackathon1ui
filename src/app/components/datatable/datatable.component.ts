import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() loading = false;
  @Input() actionButtons: any[] = []; // [{ mode: 'VIEW', label: 'ดู', class: 'btn-info' }]

  @Output() actionFunction = new EventEmitter<any>();

  hasActionColumn = false;

  ngOnInit(): void {
    this.hasActionColumn = this.columns?.some(col => col.dataType === 'action');
  }

  onAction(action: string, rowData: any) {
    this.actionFunction.emit({ action, data: rowData });
  }
}
