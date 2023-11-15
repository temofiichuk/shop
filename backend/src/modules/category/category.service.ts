import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { PrismaService } from "../../prisma.service";

import slugify from "slugify";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryInput: CreateCategoryInput) {
    return this.prisma.category.create({
      data: {
        ...createCategoryInput,
        slug: slugify(createCategoryInput.name, { lower: true }),
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(name: string) {
    return this.prisma.category.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryInput,
        slug: slugify(updateCategoryInput.name, { lower: true }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
