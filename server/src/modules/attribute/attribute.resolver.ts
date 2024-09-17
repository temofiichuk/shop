import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Attribute } from "./entities/attribute.entity";
import { CreateAttributeInput } from "./dto/create-attribute.input";
import { AttributeService } from "./attribute.service";
import { UpdateAttributeInput } from "./dto/update-attribute.input";

@Resolver(() => Attribute)
export class AttributeResolver {
	constructor(private readonly attributeService: AttributeService) {
	}

	@Mutation(() => Attribute)
	createAttributeValue(
		@Args("data") data: CreateAttributeInput,
	) {
		return this.attributeService.create(data);
	}

	@Query(() => [Attribute])
	attributes() {
		return this.attributeService.findAll();
	}

	@Query(() => Attribute)
	attribute(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.findOne(id);
	}

	@Mutation(() => Attribute)
	updateAttributeValue(
		@Args("data") data: UpdateAttributeInput,
	) {
		return this.attributeService.update(data.id, data);
	}

	@Mutation(() => Attribute)
	removeAttributeValue(@Args("id", { type: () => Int }) id: number) {
		return this.attributeService.remove(id);
	}
}
