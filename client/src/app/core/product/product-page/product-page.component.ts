import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/module/interface/product.interface';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public entity = {} as Product;
  public entities = [] as Product[];
  public selectedEntities = [] as Product[];
  public formComponent = {
    visible: false,
    title: '',
    new: true
  } as any;

  public subscribes = new Subscription;
  public entityDialog = false as boolean;
  public submitted = false as boolean;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
      title: 'Adicionar Produto',
      new: true
    };
    this.entityDialog = true;
  }

  deleteSelectedEntities() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entities = this.entities.filter(val => !this.selectedEntities.includes(val));
        this.selectedEntities = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editEntity(entityModel: Product) {
    this.entity = { ...entityModel };
    this.formComponent = {
      visible: true,
      title: 'Editar Produto',
      new: false
    };
    this.entityDialog = true;
  }

  deleteEntity(entityModel: Product) {
    console.log(entityModel)
    this.confirmationService.confirm({
        message: 'Gostaria de excluir o produto ' + entityModel.name + '?',
        header: 'Deletar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            let subdelete = this.productService.delete(entityModel.id || "").subscribe(() =>{
              this.messageService.add({severity:'success', detail: 'Produto deletado com sucesso!', life: 3000});
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
    let subscriptionInitProduct = this.productService.getAllProduct().subscribe((data) => {
      console.log(data);
      this.entities = data;
    },error => console.log(error));

    this.subscribes.add(subscriptionInitProduct);
  }
}
