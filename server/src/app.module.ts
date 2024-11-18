import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { graphqlConfig } from "./config/graphql.config";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminModule } from "./modules/admin/admin.module";
import { ReviewModule } from "./modules/review/review.module";
import { OrderItemModule } from "./modules/order-item/order-item.module";
import { CategoryModule } from "./modules/category/category.module";
import { ProductModule } from "./modules/product/product.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";
import { PromotionModule } from "./modules/promotion/promotion.module";
import { ProductPromotionModule } from "./modules/product-promotion/product-promotion.module";
import { OrderModule } from "./modules/order/order.module";
import { ProductImageModule } from "./modules/product-image/product-image.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { PaginationService } from "./services/pagination/pagination.service";
import { ProductVariantModule } from "./modules/product-variant/product-variant.module";
import { AttributeModule } from "./modules/attribute/attribute.module";
import { ProductAttributeValueModule } from "./modules/product-attribute-value/product-attribute-value.module";
import { UserModule } from "./modules/user/user.module";
import { ProductAttributeModule } from "./modules/product-attribute/product-attribute.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot(graphqlConfig),
		AuthModule,
		AdminModule,
		CategoryModule,
		AttributeModule,
		ProductAttributeModule,
		ProductModule,
		ProductVariantModule,
		WishlistModule,
		PromotionModule,
		ProductPromotionModule,
		ReviewModule,
		OrderModule,
		OrderItemModule,
		ProductImageModule,
		AuthModule,
		AnalyticsModule,
		ProductAttributeValueModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService, PaginationService],
})
export class AppModule {
}
