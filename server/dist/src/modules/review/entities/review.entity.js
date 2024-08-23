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
exports.Review = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entity_1 = require("../../product/entities/product.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const client_1 = require("@prisma/client");
let Review = class Review {
};
exports.Review = Review;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Review.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Review.prototype, "updated_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => [product_entity_1.Product]),
    __metadata("design:type", Array)
], Review.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Review.prototype, "product_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Review.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Review.prototype, "status", void 0);
exports.Review = Review = __decorate([
    (0, graphql_1.ObjectType)()
], Review);
//# sourceMappingURL=review.entity.js.map