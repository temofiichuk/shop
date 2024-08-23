import { ProductService } from "./product.service";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    productCreate(id: number, createProductInput: CreateProductInput): Promise<{
        id: number;
        name: string;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number | null;
        created_at: Date;
        updated_at: Date;
    }>;
    productUpdate(id: number, updateProductInput: UpdateProductInput): Promise<{
        id: number;
        name: string;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number | null;
        created_at: Date;
        updated_at: Date;
    }>;
    productRemove(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number | null;
        created_at: Date;
        updated_at: Date;
    }>;
    productBySearch(pattern: string): Promise<{
        id: number;
        name: string;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    productGetByID(id: number): Promise<{
        name: string;
        admin: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.EnumAdminRole;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
        };
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number;
        reviews: {
            id: number;
            comment: string;
            product_id: number | null;
            user_id: number | null;
            status: import(".prisma/client").$Enums.EnumReviewStatus;
            created_at: Date;
            updated_at: Date;
        }[];
        variants: {
            id: number;
            product_id: number;
            attribute_id: number;
            value: string;
            price_modifier: number;
            stock_quantity: number;
            created_at: Date;
            updated_at: Date;
        }[];
        categories: {
            id: number;
            product_id: number;
            category_id: number;
            created_at: Date;
            updated_at: Date;
        }[];
        images: {
            id: number;
            product_id: number | null;
            name: string;
            url: string;
            created_at: Date;
            updated_at: Date;
            is_main: boolean;
        }[];
        promotions: {
            id: number;
            product_id: number;
            promotion_id: number;
            created_at: Date;
            updated_at: Date;
        }[];
        _count: {
            reviews: number;
            admin: number;
            variants: number;
            categories: number;
            images: number;
            promotions: number;
        };
    } & {
        id: number;
        name: string;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number | null;
        created_at: Date;
        updated_at: Date;
    }>;
    productGetMany(skip: number, take: number): Promise<({
        name: string;
        admin: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.EnumAdminRole;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
        };
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number;
        reviews: {
            id: number;
            comment: string;
            product_id: number | null;
            user_id: number | null;
            status: import(".prisma/client").$Enums.EnumReviewStatus;
            created_at: Date;
            updated_at: Date;
        }[];
        variants: {
            id: number;
            product_id: number;
            attribute_id: number;
            value: string;
            price_modifier: number;
            stock_quantity: number;
            created_at: Date;
            updated_at: Date;
        }[];
        categories: {
            id: number;
            product_id: number;
            category_id: number;
            created_at: Date;
            updated_at: Date;
        }[];
        images: {
            id: number;
            product_id: number | null;
            name: string;
            url: string;
            created_at: Date;
            updated_at: Date;
            is_main: boolean;
        }[];
        promotions: {
            id: number;
            product_id: number;
            promotion_id: number;
            created_at: Date;
            updated_at: Date;
        }[];
        _count: {
            reviews: number;
            admin: number;
            variants: number;
            categories: number;
            images: number;
            promotions: number;
        };
    } & {
        id: number;
        name: string;
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        rating: number;
        admin_id: number | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    productCount(): Promise<number>;
    productSetMainImage(product_id: number, image_id: number): Promise<void>;
}
