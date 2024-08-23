import { CreateReviewInput } from "./dto/create-review.input";
import { PrismaService } from "../../prisma.service";
import { EnumReviewStatus } from "@prisma/client";
export declare class ReviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user_id: number, { product_id, ...createReviewInput }: CreateReviewInput): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByProduct(id: number): Promise<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllByUser(id: number): Promise<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllByStatus(status: EnumReviewStatus): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(pattern: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateStatus(id: number, status: EnumReviewStatus): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
