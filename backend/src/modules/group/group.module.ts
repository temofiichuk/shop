import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupResolver } from "./group.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [GroupResolver, GroupService, PrismaService],
})
export class GroupModule {}
