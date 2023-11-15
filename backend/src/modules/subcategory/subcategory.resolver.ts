import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Subcategory } from "./entities/subcategory.entity";
import { SubcategoryService } from "./subcategory.service";
import { CreateSubcategoryInput } from "./dto/create-subcategory.input";
import { UpdateSubcategoryInput } from "./dto/update-subcategory.input";

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Mutation(() => Subcategory)
  subcategoryCreate(
    @Args("createSubcategoryInput")
    createSubcategoryInput: CreateSubcategoryInput
  ) {
    return this.subcategoryService.create(createSubcategoryInput);
  }

  @Query(() => [Subcategory])
  subcategoryGetAll() {
    return this.subcategoryService.findAll();
  }

  @Query(() => Subcategory)
  subcategoryFindOne(@Args("name") name: string) {
    return this.subcategoryService.findOne(name);
  }

  @Mutation(() => Subcategory)
  subcategoryUpdate(
    @Args("updateSubcategoryInput")
    updateSubcategoryInput: UpdateSubcategoryInput
  ) {
    return this.subcategoryService.update(
      updateSubcategoryInput.id,
      updateSubcategoryInput
    );
  }

  @Mutation(() => Subcategory)
  subcategoryRemove(@Args("id") id: number) {
    return this.subcategoryService.remove(id);
  }
}
