import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ReactiveFormsModule } from '@angular/forms';

//Primes Modules
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryFormComponent } from './category-form/category-form.component';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    CategoryPageComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class CategoryModule { }
