import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "src/modules/auth.example/auth.module";
import { graphqlConfig } from "./config/graphql.config";
import { AuthUserModule } from "./modules/auth-user/auth-user.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot(graphqlConfig),
		AuthModule,
		AuthUserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
