import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateSubcategoryInput } from "./dto/create-subcategory.input";
import slugify from "slugify";
import { UpdateSubcategoryInput } from "./dto/update-subcategory.input";

@Injectable()
export class SubcategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSubcategoryInput: CreateSubcategoryInput) {
    return this.prisma.subcategory.create({
      data: {
        ...createSubcategoryInput,
        slug: slugify(createSubcategoryInput.name, { lower: true }),
      },
    });
  }

  findAll() {
    return this.prisma.subcategory.findMany();
  }

  findOne(name: string) {
    return this.prisma.subcategory.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  update(id: number, updateSubcategoryInput: UpdateSubcategoryInput) {
    return this.prisma.subcategory.update({
      where: { id },
      data: {
        ...updateSubcategoryInput,
        slug: slugify(updateSubcategoryInput.name, { lower: true }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.subcategory.delete({ where: { id } });
  }
}
