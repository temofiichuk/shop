import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    userCreate(createUserInput: CreateUserInput): Promise<{
        message: string;
    }>;
    userUpdate(id: number, updateUserInput: UpdateUserInput): Promise<import("@nestjs/common").HttpException>;
    userRemove(id: number): Promise<import("@nestjs/common").HttpException>;
    userById(id: number): Promise<{
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        is_verified: boolean;
        image: string;
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
        orders: {
            id: number;
            user_id: number | null;
            total_price: number;
            status: import(".prisma/client").$Enums.EnumOrderStatus;
            created_at: Date;
            updated_at: Date;
        }[];
        _count: {
            reviews: number;
            orders: number;
        };
    }>;
}
