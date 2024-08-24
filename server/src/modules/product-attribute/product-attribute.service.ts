import { Injectable } from "@nestjs/common";
import { CreateProductAttributeInput } from "./dto/create-product-attribute.input";
import { UpdateProductAttributeInput } from "./dto/update-product-attribute.input";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class ProductAttributeService {
	constructor(private readonly prisma: PrismaService) {
	}

	async create(createAttributeInput: CreateProductAttributeInput) {
		return this.prisma.productAttribute.create({
			data: createAttributeInput,
		});
	}

	async findAll() {
		return this.prisma.productAttribute.findMany();
	}

	async findOne(id: number) {
		return this.prisma.productAttribute.findUnique({
			where: { id },
		});
	}

	async update(id: number, updateAttributeInput: UpdateProductAttributeInput) {
		return this.prisma.productAttribute.update({
			where: { id },
			data: updateAttributeInput,
		});
	}

	async remove(id: number) {
		return this.prisma.productAttribute.delete({
			where: { id },
		});
	}
}
