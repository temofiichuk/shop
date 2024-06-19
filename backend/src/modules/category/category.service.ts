import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";
import { Category } from "./entities/category.entity";
import { Category as CategoryFromPrisma, Prisma } from "@prisma/client";
import slugify from "slugify";
import { GraphQLError } from "graphql/error/GraphQLError";

@Injectable()
export class CategoryService {
	constructor(
		private readonly prisma: PrismaService,
		private configService: ConfigService
	) {}

	async create(createCategoryInput: CreateCategoryInput) {
		return this.prisma.category.create({ data: createCategoryInput });
	}

	async sync(newCategories: UpdateCategoryInput[]) {
		try {
			return this.prisma.$transaction(async (prisma) => {
				// Fetch all existing categories from the database
				const existingCategories = (await prisma.category.findMany({
					include: { children: true },
				})) as Category[];

				// Create a map of existing categories by ID for quick lookup
				const existingCategoriesMap = new Map<number, Category>(
					existingCategories.map((cat) => [cat.id, cat])
				);

				// Process new categories
				for (const category of newCategories) {
					await this.upsertCategory(category, null, existingCategoriesMap);
				}

				// Delete categories that are not in the new array
				for (const [id] of existingCategoriesMap) {
					await this.prisma.category.delete({ where: { id } });
				}

				return this.buildCategoryTree(await this.prisma.category.findMany());
			});
		} catch (error) {
			throw new GraphQLError(error);
		}
	}

	async update({ id, children, ...category }: UpdateCategoryInput) {
		return this.prisma.category.update({ where: { id }, data: category });
	}

	async remove(id: number) {
		return this.prisma.category.delete({ where: { id } });
	}

	async findAll(parent_id: number = null) {
		return this.prisma.category.findMany({ where: { parent_id } });
	}

	async getCategoryTree() {
		return this.prisma.category.findMany({
			where: { parent_id: null },
			...this.deepIncludeChildren(await this.maxDeep()),
		});
	}

	async getTypes() {
		return this.prisma.categoryType.findMany();
	}

	private deepIncludeChildren(level: number) {
		if (!level || level <= 0) return;
		return {
			include: { children: { ...this.deepIncludeChildren(level - 1) } },
		};
	}

	private async buildCategoryTree(categories: CategoryFromPrisma[]) {
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

	private async flattenCategoryTree(categoryTree: Category[]) {
		const flatCategories: Category[] = [];

		// A recursive function to flatten the tree
		const flatten = (categories: Category[]) => {
			for (const category of categories) {
				flatCategories.push(category);

				if (category?.children?.length > 0) {
					flatten(category.children);
				}
			}
		};

		// Start flattening from the top-level categories
		flatten(categoryTree);

		return flatCategories;
	}

	private async maxDeep() {
		const maxDeepLevelSQL = Prisma.sql`
        WITH RECURSIVE CategoryHierarchy AS (
            SELECT id, name, parent_id, 1 AS depth
            FROM Category
            WHERE parent_id IS NULL
            UNION ALL
            SELECT c.id, c.name, c.parent_id, ch.depth + 1
            FROM Category c
            JOIN CategoryHierarchy ch ON c.parent_id = ch.id
        )
        SELECT MAX(depth) AS max_depth
        FROM CategoryHierarchy;
		`;

		const response = await this.prisma.$queryRaw(maxDeepLevelSQL);
		return Number(response[0].max_depth);
	}

	private async upsertCategory(
		category: UpdateCategoryInput,
		parentId: number,
		existingCategoriesMap: Map<number, Category>
	) {
		const { id, name, type_name, children } = category;

		// Check if the category exists in the database
		const existingCategory = existingCategoriesMap.get(id);
		let newCategoryID: number;
		if (existingCategory) {
			// Update the existing category
			await this.prisma.category.update({
				where: { id },
				data: {
					name,
					parent: parentId ? { connect: { id: parentId } } : undefined,
					type: type_name ? { connect: { name: type_name } } : undefined,
					slug: slugify(name),
				},
			});

			// Remove the category from the map to mark it as processed
			existingCategoriesMap.delete(id);
		} else {
			// Create a new category
			const newCategory = await this.prisma.category.create({
				data: {
					name,
					parent: parentId ? { connect: { id: parentId } } : undefined,
					type: type_name ? { connect: { name: type_name } } : undefined,
					slug: slugify(name),
				},
			});
			newCategoryID = newCategory.id;
		}

		// Recursively process children
		if (children?.length > 0) {
			for (const child of children) {
				await this.upsertCategory(child, newCategoryID ?? id, existingCategoriesMap);
			}
		}
	}
}
