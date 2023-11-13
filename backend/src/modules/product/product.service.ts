import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";

import { productRelativeFields } from "./dto/product.output";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(admin_id: number, createProductInput: CreateProductInput) {
    const { category_id, subcategory_id, descriptions, images, ...fields } =
      createProductInput;

    return this.prisma.product.create({
      data: {
        ...fields,
        images: {
          createMany: {
            data: images.map(({ name, url }) => ({ name, url })),
          },
        },
        admin: {
          connect: { id: admin_id },
        },
        descriptions: {
          createMany: {
            data: descriptions.map(({ head, body }) => ({ head, body })),
          },
        },
        category: {
          connect: { id: category_id },
        },
        subcategory: {
          connect: { id: subcategory_id },
        },
      },
      include: productRelativeFields,
    });
  }

  async update(
    admin_id: number,
    { id, descriptions, images, ...updateFields }: UpdateProductInput
  ) {
    const descIds = await Promise.all(
      descriptions.map(({ id: desc_id = -1, head, body }) => {
        return this.prisma.description.upsert({
          where: { id: desc_id },
          update: { head, body },
          create: { head, body, product: { connect: { id } } },
          select: { id: true },
        });
      })
    ).then((data) => data.map((obj) => obj.id));

    return this.prisma.product.update({
      where: { id },
      data: {
        admin_id,
        ...updateFields,
        images: {
          createMany: {
            data: images.map(({ name, url }) => ({ name, url })),
          },
        },
        descriptions: {
          deleteMany: {
            id: { notIn: descIds },
            product_id: id,
          },
        },
      },
      include: productRelativeFields,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
