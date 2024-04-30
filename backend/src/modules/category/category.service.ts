import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";
import { Category } from "@prisma/client";

@Injectable()
export class CategoryService {
	constructor(
		private readonly prisma: PrismaService,
		private configService: ConfigService
	) {}
	async create({ parent_id, ...createCategoryInput }: CreateCategoryInput) {
		return this.prisma.category.create({
			data: { ...createCategoryInput, parent_id: parent_id ? parent_id : 0 },
		});
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
		if (!parent_id) return this.prisma.category.findMany();
		return this.prisma.category.findMany({ where: { parent_id } });
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

	async getCategoryTree(): Promise<Category[]> {
		const categories = await this.prisma.category.findMany({ include: { children: true } });
		return this.buildCategoryTree(categories);
	}

	private buildCategoryTree(categories: Category[]) {
		const topLevelCategories: Category[] = [];

		// A function for recursive construction of a tree of categories
		const buildTree = (parentId: number | null): Category[] => {
			const children = categories.filter((category) => category.parent_id === parentId);
			return children.map((child) => ({
				...child,
				children: buildTree(child.id), // Рекурсивний виклик для побудови дочірніх категорій
			}));
		};

		// Build the top-level tree
		topLevelCategories.push(...buildTree(null));

		return topLevelCategories;
	}
}
