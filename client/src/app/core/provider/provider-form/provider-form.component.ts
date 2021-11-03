import { Component, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/module/interface/provider.interface';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.sass']
})
export class ProviderFormComponent implements OnInit {

  @Input()
  public propComponent = {
    visible: false,
    title: '',
    new: false
  } as any;

  @Input()
  public entity = {} as Provider;


  private mapNameControl = new Map<String,String>();
  public isRequiredServer = false as boolean;

  //forms
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cel: new FormControl(''),
    perprice: new FormControl(40, {
      updateOn: 'blur',
      validators: [Validators.required,Validators.min(0), Validators.max(100)],
    }),
    info: new FormControl('',[Validators.maxLength(100)])
  });

  constructor( private providerService: ProviderService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.mapNameControl
          .set('name','Nome')
          .set('cel','Telefone')
          .set('perprice','Porcentagem da venda')
          .set('info','Informações');
  }

  validatorRequired(nameForm: string) {
    const validator = this.form.get(nameForm)?.errors;
    if (validator && validator.required) {
      return true;
    }
    return false;
  }

  validatorMaxLengh(nameForm: string) {
    const validator = this.form.get(nameForm)?.errors;
    if (validator && validator.maxLength) {
      return true;
    }
    return false;
  }

  messageError(errors: ValidationErrors) : string{
    if (errors && errors.required) return 'Campo Obrigatório';
    if(errors && errors.min) return `valor menor que ${errors.min.min}`;
    if(errors && errors.max) return `valor maior que ${errors.max.max}`;
    return 'Erro genérico'
  }

  onFormSave() {
    let tmp = this.entity;

    let listErrors = Object.keys(this.form.controls).map(x => <any>{
      name: this.mapNameControl.get(x),
      errors:this.form.controls[x].errors
    }).filter(x => x.errors != null);

    if(listErrors.length > 0){
      let listMessage = listErrors.map(x => <Message>{severity:'error', summary:`Campo \"${x.name}\"`, detail:this.messageError(x.errors)});
      this.messageService.addAll(listMessage)
      return;
    }

    this.isRequiredServer = true;
    console.log(this.entity);
    this.providerService.Save(this.entity)?.subscribe(res => {

      this.messageService.add(<Message>{
        severity:'sucess',
         summary:`Entidade Salva com sucesso`
      })
      this.propComponent.visible = false;
    },errors => {
      console.log(errors);
      this.messageService.add(<Message>{
        severity:'error',
         summary:`Problema ao Salvar`, detail:errors.error.message
      })
    },()=>{
      this.isRequiredServer = false;
    })
  }
}

