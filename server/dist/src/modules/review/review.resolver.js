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
exports.ReviewResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const review_service_1 = require("./review.service");
const review_entity_1 = require("./entities/review.entity");
const create_review_input_1 = require("./dto/create-review.input");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const auth_admin_decorators_1 = require("../auth/decorators/auth-admin.decorators");
const client_1 = require("@prisma/client");
const current_user_decorators_1 = require("../auth/decorators/current-user.decorators");
let ReviewResolver = class ReviewResolver {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    reviewCreate(id, createReviewInput) {
        return this.reviewService.create(id, createReviewInput);
    }
    reviewGetAllByStatus(status) {
        return this.reviewService.findAllByStatus(status);
    }
    reviewFindOne(pattern) {
        return this.reviewService.findOne(pattern);
    }
    reviewGetByProduct(id) {
        return this.reviewService.findAllByProduct(id);
    }
    reviewGetByUser(id) {
        return this.reviewService.findAllByUser(id);
    }
    reviewUpdateStatus(id, status) {
        return this.reviewService.updateStatus(id, status);
    }
    reviewRemove(id) {
        return this.reviewService.remove(id);
    }
};
exports.ReviewResolver = ReviewResolver;
__decorate([
    (0, graphql_1.Mutation)(() => review_entity_1.Review),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, current_user_decorators_1.CurrentUser)("id")),
    __param(1, (0, graphql_1.Args)("createReviewInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_review_input_1.CreateReviewInput]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewCreate", null);
__decorate([
    (0, graphql_1.Query)(() => [review_entity_1.Review]),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, graphql_1.Args)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewGetAllByStatus", null);
__decorate([
    (0, graphql_1.Query)(() => review_entity_1.Review),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, graphql_1.Args)("pattern")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewFindOne", null);
__decorate([
    (0, graphql_1.Query)(() => review_entity_1.Review),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewGetByProduct", null);
__decorate([
    (0, graphql_1.Query)(() => review_entity_1.Review),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, current_user_decorators_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewGetByUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => review_entity_1.Review),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Args)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewUpdateStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => review_entity_1.Review),
    (0, auth_admin_decorators_1.AuthAdmin)(),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "reviewRemove", null);
exports.ReviewResolver = ReviewResolver = __decorate([
    (0, graphql_1.Resolver)(() => review_entity_1.Review),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewResolver);
//# sourceMappingURL=review.resolver.js.map