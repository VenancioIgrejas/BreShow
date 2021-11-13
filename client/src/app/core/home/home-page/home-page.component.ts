import { Component, OnInit } from '@angular/core';
import { GridTable } from 'src/app/component/grid-view/modules/interface/grid-table.interface';
import { Category } from 'src/app/module/interface/category.interface';
import { Product } from 'src/app/module/interface/product.interface';
import { Provider } from 'src/app/module/interface/provider.interface';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private providerService: ProviderService
  ){}

  public gridCategory = {} as GridTable<Category>;
  public gridProvider = {} as GridTable<Provider>;
  public gridProduct = {} as GridTable<Product>;

  ngOnInit(): void {
    
    //load table from category
    this.categoryService.getAllCategory().subscribe((data)=>{
      this.gridCategory.GridColumn = [{
        header:"Nome ",
        field: "name"
      }]
      this.gridCategory.GridInfo = {
        title: "Tabela de Categoria",
        entityName: "categorias"
      }
      this.gridCategory.GridData = data;
    })
    
    //load table from provider
    this.providerService.getAllProvider().subscribe((data)=>{

      this.gridProvider.GridColumn = [{
        header:"Nome ",
        field: "name"
      },{
        header:"Telefone ",
        field: "cel"
      },{
        header:"Porcentagem ",
        field: "perPriceGrid"
      }]

      this.gridProvider.GridInfo = {
        title: "Tabela de Fornecedores",
        entityName: "fornecedores"
      }
      this.gridProvider.GridData = data;
    })

    //load table from product
    this.productService.getAllProduct().subscribe((data)=>{

      this.gridProduct.GridColumn = [{
        header:"Nome ",
        field: "name"
      },{
        header:"Categoria ",
        field: "category",
        subField:"name"
      },{
        header:"Fornecedor ",
        field: "provider",
        subField:"name"
      },{
        header:"Valor Final ",
        field: "priceFinalGrid"
      },{
        header:"Valor Total ",
        field: "priceTotalGrid"
      },{
        header:"Valor Unitario ",
        field: "priceGrid"
      },{
        header:"Quantidade ",
        field: "quantity"
      },{
        header:"Data da Venda ",
        field: "dateInGrid"
      }]

      this.gridProduct.GridInfo = {
        title: "Tabela de Produtos",
        entityName: "produtos"
      }
      this.gridProduct.GridData = data;
    })

  }

}
