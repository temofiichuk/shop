import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { PrismaClientExceptionFilter } from "./filter/prisma-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(process.env.SERVER_PORT || 3001);
}
bootstrap();
