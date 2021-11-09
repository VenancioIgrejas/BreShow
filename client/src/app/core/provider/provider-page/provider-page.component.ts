import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Provider } from 'src/app/module/interface/provider.interface';
import { ProviderService } from 'src/app/service/provider.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.sass']
})
export class ProviderPageComponent implements OnInit, OnDestroy {

  public entity = {} as Provider;
  public entities = [] as Provider[];
  public selectedEntities = [] as Provider[];
  public formComponent = {
    visible: false,
    title: '',
    new: true
  } as any;

  public subscribes = new Subscription;
  public entityDialog = false as boolean;
  public submitted = false as boolean;

  constructor(private providerService: ProviderService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
      message: 'Are you sure you want to delete the selected providers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entities = this.entities.filter(val => !this.selectedEntities.includes(val));
        this.selectedEntities = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Providers Deleted', life: 3000 });
      }
    });
  }

  editEntity(entityModel: Provider) {
    this.entity = { ...entityModel };
    this.entity.perPrice = (this.entity.perPrice || 0);
    this.formComponent = {
      visible: true,
      title: 'Editar Fornecedor',
      new: false
    };
    this.entityDialog = true;
  }

  deleteEntity(entityModel: Provider) {
    console.log(entityModel)
    this.confirmationService.confirm({
        message: 'Gostaria de excluir o fornecedor ' + entityModel.name + '?',
        header: 'Deletar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            let subdelete = this.providerService.delete(entityModel.id || "").subscribe(() =>{
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
    let subscriptionInitProvider = this.providerService.getAllProvider().subscribe((data) => {
      console.log(data);
      this.entities = data;
    },error => console.log(error));

    this.subscribes.add(subscriptionInitProvider);
  }

}
