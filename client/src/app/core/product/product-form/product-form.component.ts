import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/module/interface/product.interface';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/module/interface/category.interface';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/module/interface/provider.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  @Input()
  public propComponent = {
    visible: false,
    title: '',
    new: false
  } as any;

  @Input()
  public entity = {} as Product;

  @Output("updateTable") 
  public updateTable: EventEmitter<any> = new EventEmitter();

  private mapNameControl = new Map<String,String>();
  public category$!: Observable<Category[]>;
  public provider$!: Observable<Provider[]>;
  public isRequiredServer = false as boolean;

  //forms
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    dateIn: new FormControl('', [Validators.required])
  });

  constructor( private productService: ProductService,
               private messageService: MessageService,
               private providerService: ProviderService,
               private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.mapNameControl
          .set('name','Nome')
          .set('category', 'Categoria')
          .set('comment', 'Comentário')
          .set('provider', 'Fornecedor')
          .set('price', 'Valor')
          .set('quantity', 'Quantidade')
          .set('dateIn', 'Data da Venda');

    this.category$ = this.categoryService.getAllCategory().pipe(
      map(category => category)
   );
   this.provider$ = this.providerService.getAllProvider().pipe(
    map(provider => provider)
 );
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
    
    if(this.propComponent.new){
      this.add()
    }else{
      this.edit()
    }

  }

  edit() {
    this.productService.edit(this.entity)?.subscribe(res => {

      this.messageService.add(<Message>{
        severity:'sucess',
         summary:`Entidade Salva com sucesso`
      })
      this.propComponent.visible = false;
      this.updateTable.emit();
    },errors => {
      this.messageService.add(<Message>{
        severity:'error',
         summary:`Problema ao Salvar`, detail:errors.error.message
      })
      this.isRequiredServer = false;
    })
  }

  add(){
    this.productService.add(this.entity)?.subscribe(res => {

      this.messageService.add(<Message>{
        severity:'sucess',
         summary:`Entidade Salva com sucesso`
      })
      this.propComponent.visible = false;
      this.updateTable.emit();
    },errors => {
      this.messageService.add(<Message>{
        severity:'error',
         summary:`Problema ao Salvar`, detail:errors.error.message
      })
      this.isRequiredServer = false;

    })
  }
}

