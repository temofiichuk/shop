import { Injectable } from "@nestjs/common";
import { UpdateProductAttributeInput } from "./dto/update-product-attribute.input";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class ProductAttributeService {
	constructor(private readonly prisma: PrismaService) {
	}

	// create({ values, ...data }: CreateProductAttributeInput) {
	// 	return this.prisma.productAttribute.create({
	// 		data: {
	// 			...data,
	// 			values: {
	// 				connect: values.map(({ value }) => ({ value })),
	// 			},
	// 		},
	// 	});
	// }

	async findAll() {
		return this.prisma.productAttribute.findMany({
			include: { values: true },
		});
	}

	async findOne(id: number) {
		return this.prisma.productAttribute.findUnique({
			where: { id },
			include: { values: true },
		});
	}

	async update(id: number, { values, ...data }: UpdateProductAttributeInput) {
		return this.prisma.$transaction(async (prisma) => {

			const availableValuesIds = await prisma.productAttribute.findUnique({
				where: { id },
				select: {
					values: {
						select: { value: true },
					},
				},
			}).then(attr => attr.values.map(({ value }) => value));

			return prisma.productAttribute.update({
				where: { id },
				data: {
					...data,
					values: {
						disconnect: values.filter(({ value }) => !availableValuesIds.includes(value)),
						connect: values.map(({ value }) => ({ value })),
					},
				},
			});
		});
	}

	async remove(id: number) {
		return this.prisma.productAttribute.delete({
			where: { id },
		});
	}
}
