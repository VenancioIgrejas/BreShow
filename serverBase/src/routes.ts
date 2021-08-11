import {ProductController} from "./controller/ProductController";
import {ProviderController} from "./controller/ProviderController";
import {CategoryController} from "./controller/CategoryController";


export const Routes = [

//routes for provider
//
//For save: json ->
//{name:String,cel:string,info:string,per_price:decimal,userId:int}
//
{
    method: "get",
    route: "/provider",
    controller: ProviderController,
    action: "all"
}, {
    method: "get",
    route: "/provider/:id",
    controller: ProviderController,
    action: "one"
}, {
    method: "post",
    route: "/provider",
    controller: ProviderController,
    action: "save"
}, {
    method: "delete",
    route: "/provider/:id",
    controller: ProviderController,
    action: "remove"
},


//routes for category
//
//For save: json ->
//{name:String,userId:int}
//

{
    method: "get",
    route: "/category",
    controller: CategoryController,
    action: "all"
}, {
    method: "get",
    route: "/category/:id",
    controller: CategoryController,
    action: "one"
}, {
    method: "post",
    route: "/category",
    controller: CategoryController,
    action: "save"
}, {
    method: "delete",
    route: "/category/:id",
    controller: CategoryController,
    action: "remove"
},

//routes for product
//
//For save: json ->
//{name:string,comment:string,price:decimal,quantity:int,date_in:datetime,userId:int,categoryId:int,providerId:int}
//
{
    method: "get",
    route: "/product",
    controller: ProductController,
    action: "all"
}, {
    method: "get",
    route: "/product/:id",
    controller: ProductController,
    action: "one"
}, {
    method: "post",
    route: "/product",
    controller: ProductController,
    action: "save"
}, {
    method: "delete",
    route: "/product/:id",
    controller: ProductController,
    action: "remove"
}, {
    method: "get",
    route: "/productTable",
    controller: ProductController,
    action: "allTable"
}
];