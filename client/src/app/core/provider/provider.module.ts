import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderPageComponent } from './provider-page/provider-page.component';
import {CardModule} from 'primeng/card';




@NgModule({
  declarations: [
    ProviderPageComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ]
})
export class ProviderModule { }
