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

	findAll(id?: number) {
		return this.prisma.productAttributeValue.findMany({
			where: { product_attribute_id: id },
			include: {
				product_attribute: true,
			},
		});
	}

	findOne(id: number) {
		return this.prisma.productAttributeValue.findUnique({
			where: { id },
			include: {
				product_attribute: true,
			},
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
