import { CreateProductInput, DescriptionInput } from "./create-product.input";
declare const UpdateDescriptionInput_base: import("@nestjs/common").Type<Partial<DescriptionInput>>;
export declare class UpdateDescriptionInput extends UpdateDescriptionInput_base {
    id?: number;
}
declare const UpdateProductInput_base: import("@nestjs/common").Type<Partial<Omit<CreateProductInput, "descriptions">>>;
export declare class UpdateProductInput extends UpdateProductInput_base {
    id: number;
    descriptions: UpdateDescriptionInput[];
}
export {};
