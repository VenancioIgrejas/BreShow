import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderPageComponent } from './provider-page/provider-page.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    ProviderPageComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class ProviderModule { }
