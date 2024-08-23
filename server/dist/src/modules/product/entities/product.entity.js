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
exports.Product = exports.ProductImage = exports.ProductDescription = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_entity_1 = require("../../category/entities/category.entity");
let ProductDescription = class ProductDescription {
};
exports.ProductDescription = ProductDescription;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductDescription.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductDescription.prototype, "head", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductDescription.prototype, "body", void 0);
exports.ProductDescription = ProductDescription = __decorate([
    (0, graphql_1.ObjectType)()
], ProductDescription);
let ProductImage = class ProductImage {
};
exports.ProductImage = ProductImage;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductImage.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductImage.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductImage.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ProductImage.prototype, "is_main", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, graphql_1.ObjectType)()
], ProductImage);
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ProductDescription]),
    __metadata("design:type", Array)
], Product.prototype, "descriptions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [category_entity_1.Category]),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ProductImage]),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
exports.Product = Product = __decorate([
    (0, graphql_1.ObjectType)()
], Product);
//# sourceMappingURL=product.entity.js.map