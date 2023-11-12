import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import {
  CreateProductInput,
  DescriptionInput,
} from "./dto/create-product.input";
import {
  UpdateDescriptionInput,
  UpdateProductInput,
} from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";

import { productRelativeFields } from "./dto/product.output";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(admin_id: number, createProductInput: CreateProductInput) {
    const existsProduct = await this.prisma.product.findUnique({
      where: { name: createProductInput.name },
    });

    if (existsProduct)
      throw new HttpException("Product already exists", HttpStatus.CONFLICT);

    const { descriptions, category_id, subcategory_id, images, ...fields } =
      createProductInput;

    let product = null;
    // try {
    product = await this.prisma.product.create({
      data: {
        ...fields,
        category: {
          connect: { id: category_id },
        },
        subcategory: {
          connect: { id: subcategory_id },
        },
        images: {
          createMany: {
            data: images.map(({ name, url }) => ({ name, url })),
          },
        },
        admin: {
          connect: { id: admin_id },
        },
      },
    });
    // } catch (e) {
    //   throw new BadGatewayException("Product not created");
    // }

    await this.createDescriptions(descriptions, product.id);

    return product;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(
    admin_id: number,
    { id, descriptions, images, ...updateFields }: UpdateProductInput
  ) {
    const product = await this.prisma.product.update({
      where: { id: id },
      data: {
        admin_id,
        ...updateFields,
        images: {
          createMany: {
            data: images.map(({ name, url }) => ({ name, url })),
          },
        },
      },
      include: productRelativeFields,
    });
    if (!product) throw new BadGatewayException("Product wasn't updated");
    await this.updateDescriptions(descriptions, product.id);
    console.log(product);
    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private async updateDescriptions(
    descriptions: UpdateDescriptionInput[],
    product_id: number
  ) {
    try {
      descriptions.map(({ id, head, body }) =>
        this.prisma.description.upsert({
          where: { id },
          create: { head, body, product_id },
          update: { head, body, product_id },
        })
      );
    } catch (e) {
      throw new BadGatewayException("Descriptions not updated");
    }
  }

  private async createDescriptions(
    descriptions: DescriptionInput[],
    product_id: number
  ) {
    try {
      await this.prisma.description.createMany({
        data: descriptions.map(({ head, body }) => ({
          head,
          body,
          product_id,
        })),
      });
    } catch (e) {
      throw new BadGatewayException("Descriptions not created");
    }
  }
}
