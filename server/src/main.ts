import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { PrismaClientExceptionFilter } from "./filter/prisma-exception.filter";
import { CustomValidationPipe } from "./pipes/custom-validation.pipe";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableShutdownHooks();
	app.enableCors();
	app.useGlobalFilters(new PrismaClientExceptionFilter());
	app.useGlobalPipes(new CustomValidationPipe());
	await app.listen(process.env.SERVER_PORT || 3001, "0.0.0.0");
}

bootstrap();
