import { Category } from "./category.interface";
import { Provider } from "./provider.interface";

export interface Product {
    id?:string
    name?:string;
    provider?: Provider;
    category?: Category;
    price?: number;
    quantity?: number;
    comment?: string;
    dateIn?: Date;
}
