import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { User } from "../graphql.schema";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  providers: [UsersResolver, User, UsersService, PrismaService],
})
export class UsersModule {}
