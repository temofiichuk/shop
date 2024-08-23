import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";
export declare class ProductService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    generateSKU(): string;
    create(admin_id: number, { descriptions, categories, images, ...fields }: CreateProductInput): Promise<{
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
    update(admin_id: number, { id, descriptions, images, ...updateFields }: UpdateProductInput): Promise<{
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
    remove(id: number): Promise<{
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
    findManyBySearch(pattern: string, max?: number): Promise<{
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
    getMany(skip: number, take?: number): Promise<({
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
        name: string;
        id: number;
        rating: number;
        created_at: Date;
        updated_at: Date;
        reviews: {
            id: number;
            comment: string;
            product_id: number | null;
            user_id: number | null;
            status: import(".prisma/client").$Enums.EnumReviewStatus;
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
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        admin_id: number;
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
    getCount(): Promise<number>;
    getByID(id: number): Promise<{
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
        name: string;
        id: number;
        rating: number;
        created_at: Date;
        updated_at: Date;
        reviews: {
            id: number;
            comment: string;
            product_id: number | null;
            user_id: number | null;
            status: import(".prisma/client").$Enums.EnumReviewStatus;
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
        description: string;
        sku: string;
        base_price: number;
        slug: string;
        stock: number;
        admin_id: number;
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
    setMainImage(product_id: number, imageId: number): Promise<void>;
}
