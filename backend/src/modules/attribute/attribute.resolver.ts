import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AttributeService } from "./attribute.service";
import { Attribute } from "./entities/attribute.entity";
import { CreateAttributeInput } from "./dto/create-attribute.input";
import { UpdateAttributeInput } from "./dto/update-attribute.input";
import { AuthAdmin } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => Attribute)
@AuthAdmin()
export class AttributeResolver {
  constructor(private readonly attributeService: AttributeService) {}

  @Mutation(() => Attribute)
  attributeCreate(
    @Args("createAttributeInput") createAttributeInput: CreateAttributeInput
  ) {
    return this.attributeService.create(createAttributeInput);
  }

  @Query(() => [Attribute])
  attributeGetAll() {
    return this.attributeService.findAll();
  }

  @Mutation(() => Attribute)
  attributeUpdate(
    @Args("updateAttributeInput") updateAttributeInput: UpdateAttributeInput
  ) {
    return this.attributeService.update(
      updateAttributeInput.id,
      updateAttributeInput
    );
  }

  @Mutation(() => Attribute)
  attributeRemove(@Args("id") id: number) {
    return this.attributeService.remove(id);
  }
}
