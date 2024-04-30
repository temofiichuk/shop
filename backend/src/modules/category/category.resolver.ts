import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Mutation(() => Category)
	categoryCreate(@Args("createCategoryInput") createCategoryInput: CreateCategoryInput) {
		return this.categoryService.create(createCategoryInput);
	}

	@Mutation(() => Category)
	categoryUpdate(@Args("updateCategoryInput") updateCategoryInput: UpdateCategoryInput) {
		return this.categoryService.update(updateCategoryInput);
	}

	@Mutation(() => Category)
	categoryRemove(@Args("id") id: number) {
		return this.categoryService.remove(id);
	}

	@Query(() => [Category])
	categoryGetAll() {
		return this.categoryService.findAll();
	}

	@Query(() => Category)
	categoryFindOne(@Args("name") name: string) {
		return this.categoryService.findOne(name);
	}
}
