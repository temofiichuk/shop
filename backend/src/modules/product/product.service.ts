import { Injectable } from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "../../prisma.service";

import { productRelativeFields } from "./dto/product.output";
import { ConfigService } from "@nestjs/config";
import slugify from "slugify";

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private configService: ConfigService
	) {}

	generateSKU() {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let sku = "";
		for (let i = 0; i < 8; i++) {
			sku += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return sku;
	}

	async create(
		admin_id: number = 1,
		{ descriptions = [], categories, images = [], ...fields }: CreateProductInput
	) {
		if (images.length > 0) {
			const mainImage = images.find((item) => item.is_main);
			if (!mainImage) images[0].is_main = true;
		}

		try {
			return this.prisma.$transaction(async (prisma) => {
				const product = await prisma.product.create({
					data: {
						...fields,
						slug: slugify(fields.name, { lower: true }),
						sku: fields?.sku ?? this.generateSKU(),
						admin: {
							connect: { id: admin_id },
						},
						descriptions: {
							createMany: {
								data: descriptions.map(({ ...fields }) => ({ ...fields })),
							},
						},
						categories: {
							connect: categories.map(({ id }) => ({ id })),
						},
					},
					include: productRelativeFields,
				});

				await Promise.all(
					images.map(({ url, name, is_main }) =>
						prisma.image.upsert({
							where: { url, product_id: product.id },
							update: { is_main, name },
							create: { url, name, is_main, product: { connect: { id: product.id } } },
						})
					)
				);

				return product;
			});
		} catch (error) {
			throw new Error(error);
		}
	}

	async update(
		admin_id: number,
		{ id, descriptions, images, ...updateFields }: UpdateProductInput
	) {
		return this.prisma.$transaction(async (prisma) => {
			const descIds = await Promise.all(
				descriptions.map(({ id: desc_id = -1, head, body }) => {
					return prisma.description.upsert({
						where: { id: desc_id },
						update: { head, body },
						create: { head, body, product: { connect: { id } } },
						select: { id: true },
					});
				})
			).then((data) => data.map((obj) => obj.id));

			const imgIds = await Promise.all(
				images.map(({ url, name, is_main }) => {
					return prisma.image.upsert({
						where: { url },
						update: { is_main },
						create: { url, name, is_main, product: { connect: { id } } },
						select: { id: true },
					});
				})
			).then((data) => data.map((obj) => obj.id));

			return prisma.product.update({
				where: { id },
				data: {
					admin_id,
					...updateFields,
					images: {
						deleteMany: {
							id: { notIn: imgIds },
							product_id: id,
						},
					},
					descriptions: {
						deleteMany: {
							id: { notIn: descIds },
							product_id: id,
						},
					},
					categories: {
						set: updateFields.categories.map((category) => ({ id: category.id })),
					},
				},
				include: productRelativeFields,
			});
		});
	}

	async remove(id: number) {
		const deletedProduct = await this.prisma.product.delete({ where: { id } });
		await this.prisma.description.deleteMany({ where: { product_id: deletedProduct.id } });
		return deletedProduct;
	}

	async findManyBySearch(pattern: string, max: number = 10) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					// { categories: { name: { contains: pattern } } },
					{
						descriptions: {
							some: {
								OR: [{ head: { contains: pattern } }, { body: { contains: pattern } }],
							},
						},
					},
					{ name: { contains: pattern } },
				],
			},
			take: max,
			include: productRelativeFields,
		});
	}

	async getMany(skip: number, take: number = 10) {
		return this.prisma.product.findMany({
			skip,
			take,
			include: productRelativeFields,
		});
	}

	async getCount() {
		return this.prisma.product.count();
	}

	async getByID(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
			include: productRelativeFields,
		});
	}

	async setMainImage(product_id: number, imageId: number) {
		return this.prisma.$transaction(async (prisma) => {
			const currentMainImage = await prisma.image.findFirst({
				where: { product_id, is_main: true },
			});

			if (currentMainImage) {
				await prisma.image.update({
					where: { id: currentMainImage.id },
					data: { is_main: false },
				});
			}

			await prisma.image.update({
				where: { id: imageId, product_id },
				data: { is_main: true },
			});
		});
	}
}
