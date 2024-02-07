import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";

import { productRelativeFields } from "./dto/product.output";
import { ConfigService } from "@nestjs/config";
import slugify from "slugify";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  async create(admin_id: number, createProductInput: CreateProductInput) {
    const {
      category_id,
      subcategory_id,
      descriptions = [],
      images = [],
      ...fields
    } = createProductInput;

    return this.prisma.product.create({
      data: {
        ...fields,
        slug: slugify(fields.name, { lower: true }),
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

    const slug = updateFields.name
      ? { slug: slugify(updateFields.name, { lower: true }) }
      : {};

    return this.prisma.product.update({
      where: { id },
      data: {
        admin_id,
        ...updateFields,
        ...slug,
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

  async findManyBySearch(pattern: string, max: number = 10) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { category: { name: { contains: pattern } } },
          { subcategory: { name: { contains: pattern } } },
          {
            descriptions: {
              some: {
                OR: [
                  { head: { contains: pattern } },
                  { body: { contains: pattern } },
                ],
              },
            },
          },
          { name: { contains: pattern } },
        ],
      },
      take: max,
      include: productRelativeFields,
    });
  }

  async getMany(skip: number, take: number = 10) {
    return this.prisma.product.findMany({
      skip,
      take,
      include: productRelativeFields,
    });
  }

  async getCount() {
    return this.prisma.product.count();
  }
}
