import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TypeService } from "./type.service";
import { Type } from "./entities/type.entity";
import { CreateTypeInput } from "./dto/create-type.input";
import { UpdateTypeInput } from "./dto/update-type.input";

@Resolver(() => Type)
export class TypeResolver {
	constructor(private readonly typeService: TypeService) {}

	@Mutation(() => Type)
	createType(@Args("createTypeInput") createTypeInput: CreateTypeInput) {
		return this.typeService.create(createTypeInput);
	}

	@Mutation(() => Type)
	updateType(@Args("updateTypeInput") updateTypeInput: UpdateTypeInput) {
		return this.typeService.update(updateTypeInput.id, updateTypeInput);
	}

	@Mutation(() => Type)
	removeType(@Args("id", { type: () => Int }) id: number) {
		return this.typeService.remove(id);
	}

	@Query(() => [Type])
	findAllTypes(@Args("group_id") group_id: number) {
		return this.typeService.findAll(group_id);
	}

	@Query(() => Type)
	findOneType(@Args("id", { type: () => Int }) id: number) {
		return this.typeService.findOne(id);
	}
}
