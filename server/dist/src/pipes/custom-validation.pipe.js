"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class CustomValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            transform: true,
            exceptionFactory: (errors) => {
                const formattedErrors = {};
                errors.forEach((error) => {
                    formattedErrors[error.property] = Object.values(error.constraints)[0];
                });
                const res = {
                    message: "Validation error",
                    validation_errors: formattedErrors,
                };
                return new common_1.BadRequestException(JSON.stringify(res));
            },
        });
    }
}
exports.CustomValidationPipe = CustomValidationPipe;
//# sourceMappingURL=custom-validation.pipe.js.map