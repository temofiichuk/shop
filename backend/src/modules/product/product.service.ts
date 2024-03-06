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

	async create(admin_id: number, createProductInput: CreateProductInput) {
		const {
			category_id,
			subcategory_id,
			descriptions = [],
			images = [],
			...fields
		} = createProductInput;

		if (images.length > 0) {
			const mainImage = images.find((item) => item.is_main);
			if (!mainImage) images[0].is_main = true;
		}

		return this.prisma.product.create({
			data: {
				...fields,
				slug: slugify(fields.name, { lower: true }),
				images: {
					createMany: {
						data: images.map(({ ...fields }) => ({ ...fields })),
					},
				},
				admin: {
					connect: { id: admin_id },
				},
				descriptions: {
					createMany: {
						data: descriptions.map(({ ...fields }) => ({ ...fields })),
					},
				},
				category: {
					connect: { id: category_id },
				},
				subcategory: {
					connect: { id: subcategory_id },
				},
			},
			include: productRelativeFields,
		});
	}

	async update(
		admin_id: number,
		{ id, descriptions, images, ...updateFields }: UpdateProductInput
	) {
		const descIds = await Promise.all(
			descriptions.map(({ id: desc_id = -1, head, body }) => {
				return this.prisma.description.upsert({
					where: { id: desc_id },
					update: { head, body },
					create: { head, body, product: { connect: { id } } },
					select: { id: true },
				});
			})
		).then((data) => data.map((obj) => obj.id));

		const imgIds = await Promise.all(
			images.map(({ url, name, is_main }) => {
				return this.prisma.image.upsert({
					where: { url },
					update: { is_main },
					create: { url, name, is_main, product: { connect: { id } } },
					select: { id: true },
				});
			})
		).then((data) => data.map((obj) => obj.id));

		return this.prisma.product.update({
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
			},
			include: productRelativeFields,
		});
	}

	async remove(id: number) {
		return this.prisma.product.delete({ where: { id } });
	}

	async findManyBySearch(pattern: string, max: number = 10) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{ category: { name: { contains: pattern } } },
					{ subcategory: { name: { contains: pattern } } },
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
