import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";
import { PaginationInput } from "../../services/pagination/dto/pagination.input";
import { PaginationService } from "../../services/pagination/pagination.service";
import { FilterProductInput } from "./dto/filter-product.input";
import { includeProductFields } from "./dto/product.output";

@Injectable()
export class ProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pagination: PaginationService) {
	}

	async create(createData: CreateProductInput) {
		const { attributes, variants, categories, ...data } = createData;

		return this.prisma.product.create({
			data: {
				...data,
				attributes: attributes && {
					create: attributes?.map(({ name, values }) => ({
						name,
						values: {
							connect: values.map(({ value }) => ({ value })),
						},
					})),
				},
				variants: variants && {
					create: variants.map(({ variant_attributes, ...variant }) => ({
						...variant,
						variant_attributes: {
							create: variant_attributes,
						},
					})),
				},
				categories: categories && {
					connect: categories,
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
			const { id: product_id, attributes, variants, categories, ...data } = updateData;
			const {
				attributes: availableAttrs,
				variants: availableVariants,
				categories: availableCategories,
			} = await prisma.product.findUnique({
				where: { id: product_id },
				select: {
					attributes: {
						select: {
							name: true, values: true, id: true,
						},
					},
					variants: {
						select: {
							id: true,
							variant_attributes: true,
						},
					}, categories: true,
				},
			});

			const currentAttrsIds = attributes?.map(({ id }) => id);
			const currentVariantsIds = variants?.map(({ id }) => id);
			const currentCategoriesIds = categories?.map(({ id }) => id);

			return prisma.product.update({
				where: { id: product_id },
				data: {
					...data,
					attributes: attributes && {
						deleteMany: availableAttrs.filter(({ id }) => !currentAttrsIds.includes(id)).map(({ name }) => ({
							name, product_id,
						})),
						upsert: attributes?.map(({ id, name, values }) => ({
							where: { name_product_id: { name, product_id: updateData.id } },
							create: {
								name: name,
								values: {
									connect: values.map(({ value }) => ({ value })),
								},
							},
							update: {
								values: {
									connect: values.map(({ value }) => ({ value })),
									disconnect: availableAttrs?.find((attr) => attr.id === id)
										?.values?.filter(({ value: availableValue }) => !values.some(({ value }) => value === availableValue))
										?.map(({ value }) => ({ value })),
								},
							},
						})),
					},
					variants: variants && {
						deleteMany: availableVariants.filter(({ id }) => !currentVariantsIds.includes(id)).map(({ id }) => ({ id })),
						upsert: variants?.map(({ id: variant_id, variant_attributes, ...variant }) => ({
							where: { id: variant_id ?? 0 },
							update: {
								...variant,
								variant_attributes: {
									deleteMany: availableVariants?.find((variant) => variant.id === variant_id)
										?.variant_attributes?.filter(
											(availableAttr) => !variant_attributes.some(
												(attr) => availableAttr.name === attr.name && availableAttr.value === attr.value,
											))?.map(({ value }) => ({ value })),
									upsert: variant_attributes?.map(({ id: attr_value_id, ...attr }) => ({
										where: {
											name_value_product_variant_id: {
												name: attr.name,
												value: attr.value,
												product_variant_id: variant_id ?? 0,
											},
										},
										update: { ...attr },
										create: { ...attr },
									})),
								},
							},
							create: {
								...variant,
								variant_attributes: {
									create: variant_attributes,
								},
							},
						})),
					},
					categories: categories && {
						connect: categories.map(({ id }) => ({ id })),
						disconnect: availableCategories.filter(({ id }) => !currentCategoriesIds.includes(id)),
					},
				},
				include: includeProductFields,
			});
		});
	}

	async remove(id: number) {
		return this.prisma.product.delete({
			where: { id },
		});
	}
}
