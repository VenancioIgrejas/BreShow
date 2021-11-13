import { Component, Input, OnInit } from '@angular/core';
import { GridTable } from './modules/interface/grid-table.interface';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.sass']
})
export class GridViewComponent implements OnInit {

  @Input()
  public grid = {} as GridTable<any>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
