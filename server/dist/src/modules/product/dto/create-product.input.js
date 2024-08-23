"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductInput = exports.SetCategoryInput = exports.CategoryId = exports.ImageInput = exports.DescriptionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const category_entity_1 = require("../../category/entities/category.entity");
let DescriptionInput = class DescriptionInput {
};
exports.DescriptionInput = DescriptionInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" }),
    __metadata("design:type", String)
], DescriptionInput.prototype, "head", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" }),
    __metadata("design:type", String)
], DescriptionInput.prototype, "body", void 0);
exports.DescriptionInput = DescriptionInput = __decorate([
    (0, graphql_1.InputType)()
], DescriptionInput);
let ImageInput = class ImageInput {
};
exports.ImageInput = ImageInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageInput.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ImageInput.prototype, "is_main", void 0);
exports.ImageInput = ImageInput = __decorate([
    (0, graphql_1.InputType)()
], ImageInput);
let CategoryId = class CategoryId {
};
exports.CategoryId = CategoryId;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CategoryId.prototype, "id", void 0);
exports.CategoryId = CategoryId = __decorate([
    (0, graphql_1.InputType)()
], CategoryId);
let SetCategoryInput = class SetCategoryInput extends (0, graphql_1.PickType)(category_entity_1.Category, ["id", "parent_id"]) {
};
exports.SetCategoryInput = SetCategoryInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SetCategoryInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SetCategoryInput.prototype, "parent_id", void 0);
exports.SetCategoryInput = SetCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], SetCategoryInput);
let CreateProductInput = class CreateProductInput {
};
exports.CreateProductInput = CreateProductInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "sku", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "combination_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [DescriptionInput], { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "descriptions", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "stock", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ImageInput], { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SetCategoryInput]),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "categories", void 0);
exports.CreateProductInput = CreateProductInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProductInput);
//# sourceMappingURL=create-product.input.js.map