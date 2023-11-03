import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { CreateUserInput, User } from "../graphql.schema";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly users: UsersService) {}

  @Query(() => User)
  async find(@Args("id") id: number) {
    return this.users.find(id);
  }

  @Query(() => [User])
  async getAll() {
    return this.users.getAll();
  }

  @Mutation(() => User)
  async createUser(@Args("data") data: CreateUserInput) {
    return this.users.create(data);
  }
}
