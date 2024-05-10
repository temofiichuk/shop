import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CategoryTypeService } from "./category-type.service";
import { CategoryType } from "./entities/category-type.entity";
import { CreateCategoryTypeInput } from "./dto/create-category-type.input";
import { UpdateCategoryTypeInput } from "./dto/update-category-type.input";

@Resolver(() => CategoryType)
export class CategoryTypeResolver {
	constructor(private readonly categoryTypeService: CategoryTypeService) {}

	@Mutation(() => CategoryType)
	createCategoryType(
		@Args("createCategoryTypeInput") createCategoryTypeInput: CreateCategoryTypeInput
	) {
		return this.categoryTypeService.create(createCategoryTypeInput);
	}

	@Mutation(() => CategoryType)
	updateCategoryType(
		@Args("updateCategoryTypeInput") updateCategoryTypeInput: UpdateCategoryTypeInput
	) {
		return this.categoryTypeService.update(updateCategoryTypeInput);
	}

	@Mutation(() => CategoryType)
	removeCategoryType(@Args("id", { type: () => Int }) id: number) {
		return this.categoryTypeService.remove(id);
	}

	@Query(() => [CategoryType])
	getCategoryTypes() {
		return this.categoryTypeService.findAll();
	}
}
