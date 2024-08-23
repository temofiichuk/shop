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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_service_1 = require("./product.service");
const product_entity_1 = require("./entities/product.entity");
const create_product_input_1 = require("./dto/create-product.input");
const update_product_input_1 = require("./dto/update-product.input");
const auth_admin_decorators_1 = require("../auth/decorators/auth-admin.decorators");
const current_admin_decorators_1 = require("../auth/decorators/current-admin.decorators");
const common_1 = require("@nestjs/common");
const custom_validation_pipe_1 = require("../../pipes/custom-validation.pipe");
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    productCreate(id, createProductInput) {
        return this.productService.create(id, createProductInput);
    }
    productUpdate(id, updateProductInput) {
        return this.productService.update(id, updateProductInput);
    }
    productRemove(id) {
        return this.productService.remove(id);
    }
    productBySearch(pattern) {
        return this.productService.findManyBySearch(pattern);
    }
    productGetByID(id) {
        return this.productService.getByID(id);
    }
    productGetMany(skip, take) {
        return this.productService.getMany(skip, take);
    }
    async productCount() {
        return this.productService.getCount();
    }
    async productSetMainImage(product_id, image_id) {
        return this.productService.setMainImage(product_id, image_id);
    }
};
exports.ProductResolver = ProductResolver;
__decorate([
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    (0, common_1.UsePipes)(custom_validation_pipe_1.CustomValidationPipe),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, current_admin_decorators_1.CurrentAdmin)("id")),
    __param(1, (0, graphql_1.Args)("createProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productCreate", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    (0, common_1.UsePipes)(custom_validation_pipe_1.CustomValidationPipe),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, current_admin_decorators_1.CurrentAdmin)("id")),
    __param(1, (0, graphql_1.Args)("updateProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_input_1.UpdateProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productUpdate", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productRemove", null);
__decorate([
    (0, graphql_1.Query)(() => [product_entity_1.Product]),
    __param(0, (0, graphql_1.Args)("pattern")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productBySearch", null);
__decorate([
    (0, graphql_1.Query)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productGetByID", null);
__decorate([
    (0, graphql_1.Query)(() => [product_entity_1.Product]),
    __param(0, (0, graphql_1.Args)("skip")),
    __param(1, (0, graphql_1.Args)("take")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productGetMany", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productCount", null);
__decorate([
    (0, graphql_1.Query)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)("product_id")),
    __param(1, (0, graphql_1.Args)("image_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productSetMainImage", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_entity_1.Product),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
//# sourceMappingURL=product.resolver.js.map