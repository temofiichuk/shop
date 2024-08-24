import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { graphqlConfig } from "./config/graphql.config";
import { AuthUserModule } from "./modules/auth-user/auth-user.module";
import { AdminModule } from "./modules/admin/admin.module";
import { AuthAdminModule } from "./modules/auth-admin/auth-admin.module";
import { ReviewModule } from "./modules/review/review.module";
import { OrderItemModule } from "./modules/order-item/order-item.module";
import { CategoryModule } from "./modules/category/category.module";
import { ProductAttributeModule } from "./modules/product-attribute/product-attribute.module";
import { ProductCategoryModule } from "./modules/product-category/product-category.module";
import { ProductModule } from "./modules/product/product.module";
import { ProductVariantModule } from "./modules/product-variant/product-variant.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";
import { PromotionModule } from "./modules/promotion/promotion.module";
import { ProductPromotionModule } from "./modules/product-promotion/product-promotion.module";
import { OrderModule } from "./modules/order/order.module";
import { ProductImageModule } from "./modules/product-image/product-image.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot(graphqlConfig),
		AuthUserModule,
		AdminModule,
		AuthAdminModule,
		CategoryModule,
		ProductAttributeModule,
		ProductCategoryModule,
		ProductModule,
		ProductVariantModule,
		WishlistModule,
		PromotionModule,
		ProductPromotionModule,
		ReviewModule,
		OrderModule,
		OrderItemModule,
		ProductImageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
