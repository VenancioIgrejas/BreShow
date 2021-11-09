import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/module/interface/category.interface';
import { CategoryService } from 'src/app/service/category.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass']
})
export class CategoryPageComponent implements OnInit, OnDestroy {

  public entity = {} as Category;
  public entities = [] as Category[];
  public selectedEntities = [] as Category[];
  public formComponent = {
    visible: false,
    title: '',
    new: true
  } as any;

  public subscribes = new Subscription;
  public entityDialog = false as boolean;
  public submitted = false as boolean;

  constructor(private categoryService: CategoryService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }

  ngOnInit(): void {
    this.updateTable();
  }

  openNew() {
    this.entity = {};
    this.submitted = false;
    this.formComponent = {
      visible: true,
      title: 'Adicionar Fornecedor',
      new: true
    };
    this.entityDialog = true;
  }

  deleteSelectedEntities() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected categorys?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entities = this.entities.filter(val => !this.selectedEntities.includes(val));
        this.selectedEntities = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categorys Deleted', life: 3000 });
      }
    });
  }

  editEntity(entityModel: Category) {
    this.entity = { ...entityModel };
    this.formComponent = {
      visible: true,
      title: 'Editar Fornecedor',
      new: false
    };
    this.entityDialog = true;
  }

  deleteEntity(entityModel: Category) {
    console.log(entityModel)
    this.confirmationService.confirm({
        message: 'Gostaria de excluir o fornecedor ' + entityModel.name + '?',
        header: 'Deletar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            let subdelete = this.categoryService.delete(entityModel.id || "").subscribe(() =>{
              this.messageService.add({severity:'success', detail: 'Fornecedor deletado com sucesso!', life: 3000});
              this.updateTable();
            },errors =>{
              console.log(errors);
              this.messageService.add({
                severity:'error',
                summary:`Error no servidor`, detail:errors.error.message
              })
            })
            this.subscribes.add(subdelete);
        }
    });
  }

  updateTable() {
    let subscriptionInitCategory = this.categoryService.getAllCategory().subscribe((data) => {
      console.log(data);
      this.entities = data;
    },error => console.log(error));

    this.subscribes.add(subscriptionInitCategory);
  }

}
