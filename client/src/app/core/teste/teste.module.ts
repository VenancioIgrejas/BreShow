import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestePageComponent } from './teste-page/teste-page.component';
import {CardModule} from 'primeng/card';




@NgModule({
  declarations: [
    TestePageComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ]
})
export class TesteModule { }
