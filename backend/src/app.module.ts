import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/user/user.module";
import { AdminModule } from "src/modules/admin/admin.module";
import { ProductModule } from "src/modules/product/product.module";
import { ReviewModule } from "src/modules/review/review.module";
import { CategoryModule } from "./modules/category/category.module";
import { graphqlConfig } from "./config/graphql.config";
import { AttributeModule } from "./modules/attribute/attribute.module";
import { CategoryTypeModule } from './modules/category-type/category-type.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
		AuthModule,
		UserModule,
		AdminModule,
		ProductModule,
		ReviewModule,
		CategoryModule,
		AttributeModule,
		CategoryTypeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
