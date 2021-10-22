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
    // let subscriptionInitProvider = this.providerService.getProvider().subscribe((data) => {
    //   this.entities = data;
    // });

    // this.subscribes.add(subscriptionInitProvider);
    this.entities = [{
      id: 1,
      name: 'josemar',
      cel: '(21) 96175-2535',
      info: 'teste josemar',
      perPrice: 0.4,
    },{
      id: 2,
      name: 'lindamar',
      perPrice: 0.4,
    },{
      id: 3,
      name: 'Jorgin',
      perPrice: 0.6,
    }]

  }

  openNew() {
    this.entity = {id: 0};
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
    this.entity.perPrice = (this.entity.perPrice || 0) * 100;
    this.formComponent = {
      visible: true,
      title: 'Editar Fornecedor',
      new: false
    };
    this.entityDialog = true;
  }

  deleteEntity(entityModel: Provider) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + entityModel.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.entities = this.entities.filter(val => val.id !== entityModel.id);
            this.entity = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Provider Deleted', life: 3000});
        }
    });
}

}
