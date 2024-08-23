export declare class DescriptionInput {
    head: string;
    body: string;
}
export declare class ImageInput {
    name: string;
    url: string;
    is_main: boolean;
}
export declare class CategoryId {
    id: number;
}
declare const SetCategoryInput_base: import("@nestjs/common").Type<Pick<unknown, never>>;
export declare class SetCategoryInput extends SetCategoryInput_base {
    id: number;
    parent_id: number;
}
export declare class CreateProductInput {
    name: string;
    slug?: string;
    sku?: string;
    price: number;
    combination_id?: number;
    descriptions: DescriptionInput[];
    stock: number;
    rating?: number;
    images?: ImageInput[];
    categories: SetCategoryInput[];
}
export {};
