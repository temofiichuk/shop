import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {
	}

	@Mutation(() => Category)
	@IsAdminAuth()
	createCategory(@Args("createCategoryInput") createCategoryInput: CreateCategoryInput) {
		return this.categoryService.create(createCategoryInput);
	}

	@Query(() => [Category])
	categories() {
		return this.categoryService.findAll();
	}

	@Query(() => Category)
	category(@Args("id", { type: () => Int }) id: number) {
		return this.categoryService.findOne(id);
	}

	@Mutation(() => Category)
	@IsAdminAuth()
	updateCategory(@Args("updateCategoryInput") updateCategoryInput: UpdateCategoryInput) {
		return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
	}

	@Mutation(() => Category)
	@IsAdminAuth()
	removeCategory(@Args("id", { type: () => Int }) id: number) {
		return this.categoryService.remove(id);
	}
}
