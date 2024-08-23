import { ReviewService } from "./review.service";
import { CreateReviewInput } from "./dto/create-review.input";
import { EnumReviewStatus } from "@prisma/client";
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    reviewCreate(id: number, createReviewInput: CreateReviewInput): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    reviewGetAllByStatus(status: EnumReviewStatus): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    reviewFindOne(pattern: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    reviewGetByProduct(id: number): Promise<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    reviewGetByUser(id: number): Promise<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    reviewUpdateStatus(id: number, status: EnumReviewStatus): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    reviewRemove(id: number): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        comment: string;
        product_id: number | null;
        user_id: number | null;
        status: import(".prisma/client").$Enums.EnumReviewStatus;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
