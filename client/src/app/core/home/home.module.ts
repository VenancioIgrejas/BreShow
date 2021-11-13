import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';

import { GridViewComponent } from 'src/app/component/grid-view/grid-view.component';



@NgModule({
  declarations: [
    HomePageComponent,
    GridViewComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule
  ]
})
export class HomeModule { }
