import { Category } from "../../category/entities/category.entity";
export declare class ProductDescription {
    id: number;
    head: string;
    body: string;
}
export declare class ProductImage {
    id: number;
    name: string;
    url: string;
    is_main: boolean;
}
export declare class Product {
    id: number;
    name: string;
    price: number;
    slug: string;
    descriptions?: ProductDescription[];
    categories?: Category[];
    images?: ProductImage[];
    quantity: number;
    stock: number;
}
