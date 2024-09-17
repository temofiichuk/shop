import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";
import { PaginationInput } from "../../services/pagination/dto/pagination.input";
import { PaginationService } from "../../services/pagination/pagination.service";
import { FilterProductInput } from "./dto/filter-product.input";
import { includeProductFields } from "./dto/product.output";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pagination: PaginationService) {
	}

	async create(createData: CreateProductInput) {
		const { attributes, variants, ...data } = createData;

		return this.prisma.product.create({
			data: {
				...data,
				attributes: {
					connectOrCreate: attributes.map(({ name, values }) => ({
						where: { name },
						create: {
							name,
							values: {
								connectOrCreate: values.map(({ value }) => ({
									where: { value },
									create: { value },
								})),
							},
						},
					})),
				},
				variants: {
					createMany: {
						data: variants,
					},
				},
			},
		});
	};

	async findAll({ pagination, filter }: {
		pagination?: PaginationInput, filter?: FilterProductInput
	}) {
		const page = this.pagination.getPagination(pagination.take, pagination.page);
		return this.prisma.product.findMany({
			where: filter,
			include: includeProductFields,
			...page,
		});
	}

	async count() {
		return { count: await this.prisma.product.count() };
	}

	async findOne(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
			include: includeProductFields,
		});
	}

	async update(updateData: UpdateProductInput) {
		return this.prisma.$transaction(async (prisma) => {
			const { id, attributes, variants, ...data } = updateData;
			const currentAttrsIds = attributes.map(({ id }) => id);
			const {
				attributes: availableAttrs,
				variants: availableVariants,
			} = await prisma.product.findUnique({
				where: { id },
				select: { attributes: true, variants: true },
			});

			const currentVariantsIds = variants.map(({ id }) => id);

			return prisma.product.update({
				where: { id },
				data: {
					...data,
					attributes: {
						connect: attributes.map(({ id, name }) => ({ id, name })),
						disconnect: availableAttrs.filter(({ id }) => !currentAttrsIds.includes(id)),
					},
					variants: {
						deleteMany: availableVariants.filter(({ id }) => !currentVariantsIds.includes(id)),
						upsert: variants.map(({ id, variant_attributes, ...variant }) => ({
							where: { id },
							update: {
								...variant,
								variant_attributes: {
									update: variant_attributes.map(({ id, ...attr }) => ({
										where: { id },
										data: { ...attr },
									})),
								},
							},
							create: {
								...variant,
								variant_attributes: {
									create: variant_attributes.map(({ id, ...attr }) => ({ ...attr })),
								},
							},
						})),
					},
				},
			});
		});
	}

	text: Prisma.ProductVariantUpsertWithWhereUniqueWithoutProductInput[];

	async remove(id: number) {
		return this.prisma.product.delete({
			where: { id },
		});
	}
}
