import { Category } from "./category.interface";
import { Provider } from "./provider.interface";

export interface Product {
    id?:string
    name?:string;
    provider?: Provider;
    category?: Category;
    price?: number;
    priceTotal?: number;
    priceFinal?: number;
    quantity?: number;
    comment?: string;
    dateIn?: Date;
    priceGrid?: string;
    priceTotalGrid?: string;
    priceFinalGrid?: string;
    dateInGrid?: string;
}
