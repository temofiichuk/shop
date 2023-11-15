import { Injectable } from "@nestjs/common";
import { CreateAttributeInput } from "./dto/create-attribute.input";
import { UpdateAttributeInput } from "./dto/update-attribute.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class AttributeService {
  constructor(private prisma: PrismaService) {}

  async create({ values, ...createAttributeInput }: CreateAttributeInput) {
    return this.prisma.attribute.create({
      data: {
        ...createAttributeInput,
        values: {
          createMany: {
            data: values,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.attribute.findMany();
  }

  async update(
    id: number,
    { values, ...updateAttributeInput }: UpdateAttributeInput
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const valuesIds = await Promise.all(
        values.map(async ({ id: _id = -1, value }) => {
          const attributeValue = await prisma.attributeValue.upsert({
            where: { id: _id },
            update: { value },
            create: { value, attribute: { connect: { id } } },
            select: { id: true },
          });
          return attributeValue.id;
        })
      );

      return prisma.attribute.update({
        where: { id },
        data: {
          ...updateAttributeInput,
          values: {
            deleteMany: {
              id: { notIn: valuesIds },
              attribute_id: id,
            },
          },
        },
        include: { values: true },
      });
    });
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
