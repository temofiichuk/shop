"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const process = require("process");
const prisma_exception_filter_1 = require("./filter/prisma-exception.filter");
const custom_validation_pipe_1 = require("./pipes/custom-validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    app.enableCors();
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaClientExceptionFilter());
    app.useGlobalPipes(new custom_validation_pipe_1.CustomValidationPipe());
    await app.listen(process.env.SERVER_PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map