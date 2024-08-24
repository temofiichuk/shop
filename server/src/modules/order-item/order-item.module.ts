import { Module } from "@nestjs/common";
import { OrderItemService } from "./order-item.service";
import { OrderItemResolver } from "./order-item.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [OrderItemResolver, OrderItemService, PrismaService],
})
export class OrderItemModule {
}
