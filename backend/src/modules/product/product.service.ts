import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";
import * as url from "url";
import { Image, Prisma } from "@prisma/client";
import { OmitType } from "@nestjs/graphql";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(admin_id: number, createProductInput: CreateProductInput) {
    const existsProduct = await this.prisma.product.findUnique({
      where: { name: createProductInput.name },
    });

    if (existsProduct) throw new BadGatewayException("Product already exists");

    const { descriptions, category, subcategory, images, ...fields } =
      createProductInput;

    let product = null;
    try {
      product = await this.prisma.product.create({
        data: {
          ...fields,
          category: {
            connect: { name: category.name },
          },
          subcategory: {
            connect: { name: subcategory.name },
          },
          images: {
            createMany: {
              data: images.map((img) => ({ name: img.name, url: img.url })),
            },
          },
        },
      });
    } catch (e) {
      if (!product) throw new BadGatewayException("Product not created");
    }

    return product;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(admin_id: number, updateProductInput: UpdateProductInput) {
    const { id, descriptions, images, category, subcategory, ...updateFields } =
      updateProductInput;

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...updateFields,
        admin: {
          update: {
            id: admin_id,
          },
        },
        category: {
          update: {
            name: category.name,
          },
        },
        subcategory: {
          update: {
            name: subcategory.name,
          },
        },
        descriptions: {
          updateMany: {
            where: { head: { in: descriptions.map(({ head }) => head) } },
            data: descriptions.map(({ head, body }) => ({ head, body })),
          },
        },
      },
    });
    if (!product) throw new BadGatewayException("Product wasn't updated");
    throw new HttpException({ message: "Product was updated" }, HttpStatus.OK);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
