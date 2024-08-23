import { Product } from "../../product/entities/product.entity";
import { User } from "../../user/entities/user.entity";
import { EnumReviewStatus } from "@prisma/client";
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
    product: Product[];
    product_id: number;
    user: User;
    user_id: number;
    status: EnumReviewStatus;
}
