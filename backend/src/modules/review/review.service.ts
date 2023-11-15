import { Injectable } from "@nestjs/common";
import { CreateReviewInput } from "./dto/create-review.input";
import { PrismaService } from "../../prisma.service";
import { EnumReviewStatus } from "@prisma/client";

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    user_id: number,
    { product_id, ...createReviewInput }: CreateReviewInput
  ) {
    return this.prisma.review.create({
      data: {
        ...createReviewInput,
        user: {
          connect: { id: user_id },
        },
        product: {
          connect: { id: product_id },
        },
      },
    });
  }

  async findAllByProduct(id: number) {
    return this.prisma.review.findMany({ where: { product_id: id } });
  }

  async findAllByUser(id: number) {
    return this.prisma.review.findMany({ where: { user_id: id } });
  }

  findAllByStatus(status: EnumReviewStatus) {
    return this.prisma.review.findMany({ where: { status } });
  }

  findOne(pattern: string) {
    return this.prisma.review.findFirst({
      where: {
        OR: [
          { comment: { contains: pattern } },
          { user: { name: { contains: pattern } } },
        ],
      },
    });
  }

  updateStatus(id: number, status: EnumReviewStatus) {
    return this.prisma.review.update({
      where: { id },
      data: { status },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
