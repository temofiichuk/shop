import { Injectable } from "@nestjs/common";
import { CreateProductAttributeValueInput } from "./dto/create-product-attribute-value.input";
import { UpdateProductAttributeValueInput } from "./dto/update-product-attribute-value.input";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ProductAttributeValueService {
	constructor(private prisma: PrismaService) {
	}

	create(createProductAttributeValueInput: CreateProductAttributeValueInput) {
		return this.prisma.productAttributeValue.create({
			data: createProductAttributeValueInput,
		});
	}

	update(id: number, updateProductAttributeValueInput: UpdateProductAttributeValueInput) {
		return this.prisma.productAttributeValue.update({
			where: { id },
			data: updateProductAttributeValueInput,
		});
	}

	remove(id: number) {
		return this.prisma.productAttributeValue.delete({
			where: { id },
		});
	}
}
