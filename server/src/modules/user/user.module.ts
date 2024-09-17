import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PrismaService } from "../../prisma.service";
import { PaginationService } from "../../services/pagination/pagination.service";

@Module({
	providers: [UserResolver, UserService, PrismaService, PaginationService],
})
export class UserModule {
}
