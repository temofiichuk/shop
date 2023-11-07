import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.SERVER_PORT || 3001);
}
bootstrap();
