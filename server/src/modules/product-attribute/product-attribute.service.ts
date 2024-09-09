import { Injectable } from "@nestjs/common";
import { CreateProductAttributeInput } from "./dto/create-product-attribute.input";
import { UpdateProductAttributeInput } from "./dto/update-product-attribute.input";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class ProductAttributeService {
	constructor(private readonly prisma: PrismaService) {
	}

	create(createProductAttributeInput: CreateProductAttributeInput) {
		return this.prisma.productAttribute.create({
			data: createProductAttributeInput,
		});
	}

	async findAll() {
		return this.prisma.productAttribute.findMany({ include: { values: true } });
	}

	async findOne(id: number) {
		return this.prisma.productAttribute.findUnique({
			where: { id },
			include: { values: true },
		});
	}

	update(id: number, updateProductAttributeInput: UpdateProductAttributeInput) {
		return this.prisma.productAttribute.update({
			where: { id },
			data: updateProductAttributeInput,
		});
	}

	async remove(id: number) {
		return this.prisma.productAttribute.delete({
			where: { id },
		});
	}
}
