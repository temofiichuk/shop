import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { AuthAdmin } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@AuthAdmin()
	@Mutation(() => Category)
	createCategory(@Args("createCategoryInput") createCategoryInput: CreateCategoryInput) {
		return this.categoryService.create(createCategoryInput);
	}

	@AuthAdmin()
	@Mutation(() => [Category])
	updateCategory(
		@Args("updateCategoryInput")
		updateCategoryInput: UpdateCategoryInput
	) {
		return this.categoryService.update(updateCategoryInput);
	}

	@AuthAdmin()
	@Mutation(() => [Category])
	syncCategories(
		@Args("newCategories", { type: () => [UpdateCategoryInput] })
		newCategories: UpdateCategoryInput[]
	) {
		console.log(1);
		return this.categoryService.sync(newCategories);
	}

	@AuthAdmin()
	@Mutation(() => Category)
	removeCategory(@Args("id") id: number) {
		return this.categoryService.remove(id);
	}

	@Query(() => [Category])
	getCategories(@Args("parent_id", { nullable: true }) parent_id: number) {
		return this.categoryService.findAll(parent_id);
	}

	@Query(() => [Category])
	getCategoryTree() {
		return this.categoryService.getCategoryTree();
	}
}
