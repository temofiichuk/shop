import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
import { CreateGroupInput } from "./dto/create-group.input";
import { UpdateGroupInput } from "./dto/update-group.input";

@Resolver(() => Group)
export class GroupResolver {
	constructor(private readonly groupService: GroupService) {}

	@Mutation(() => Group)
	createGroup(@Args("createGroupInput") createGroupInput: CreateGroupInput) {
		return this.groupService.create(createGroupInput);
	}

	@Mutation(() => Group)
	updateGroup(@Args("updateGroupInput") updateGroupInput: UpdateGroupInput) {
		return this.groupService.update(updateGroupInput.id, updateGroupInput);
	}

	@Mutation(() => Group)
	removeGroup(@Args("id") id: number) {
		return this.groupService.remove(id);
	}

	@Query(() => [Group])
	findAllGroups(
		@Args("category_id", { nullable: true }) category_id?: number,
		@Args("subcategory_id", { nullable: true }) subcategory_id?: number
	) {
		return this.groupService.findAll(category_id, subcategory_id);
	}

	@Query(() => Group)
	findOneGroup(@Args("id", { type: () => Int }) id: number) {
		return this.groupService.findOne(id);
	}
}
