import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "src/modules/auth/auth.module";
import { graphqlConfig } from "./config/graphql.config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot(graphqlConfig),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
