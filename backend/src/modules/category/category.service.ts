import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";
import { Category } from "./entities/category.entity";
import { Category as CategoryType } from "@prisma/client";

@Injectable()
export class CategoryService {
	constructor(
		private readonly prisma: PrismaService,
		private configService: ConfigService
	) {}
	async create(createCategoryInput: CreateCategoryInput) {
		return this.prisma.category.create({ data: createCategoryInput });
	}

	async update({ id, ...updateCategoryInput }: UpdateCategoryInput) {
		return this.prisma.category.update({
			where: { id },
			data: updateCategoryInput,
		});
	}

	async remove(id: number) {
		return this.prisma.category.delete({ where: { id } });
	}

	async findAll(parent_id: number | undefined) {
		try {
			if (!parent_id) {
				return this.prisma.category.findMany();
			}
			return this.prisma.category.findMany({ where: { parent_id } });
		} catch (e) {
			console.log(e);
		}
	}

	async findOne(name: string) {
		return this.prisma.category.findFirst({
			where: {
				name: {
					contains: name,
				},
			},
		});
	}

	async getTypes() {
		return this.prisma.categoryType.findMany();
	}

	async getCategoryTree() {
		const categories = await this.prisma.category.findMany({ include: { children: true } });
		return this.buildCategoryTree(categories);
	}

	private buildCategoryTree(categories: CategoryType[]) {
		const topLevelCategories: Category[] = [];

		// A function for recursive construction of a tree of categories
		const buildTree = (parentId: number | null) => {
			const children = categories.filter((category) => category.parent_id === parentId);
			return children.map((child) => ({
				...child,
				children: buildTree(child.id),
			}));
		};

		// Build the top-level tree
		topLevelCategories.push(...buildTree(null));

		return topLevelCategories;
	}
}
