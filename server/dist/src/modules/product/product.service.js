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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const product_output_1 = require("./dto/product.output");
const config_1 = require("@nestjs/config");
const slugify_1 = require("slugify");
let ProductService = class ProductService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    generateSKU() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let sku = "";
        for (let i = 0; i < 8; i++) {
            sku += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return sku;
    }
    async create(admin_id = 1, { descriptions = [], categories, images = [], ...fields }) {
        if (images.length > 0) {
            const mainImage = images.find((item) => item.is_main);
            if (!mainImage)
                images[0].is_main = true;
        }
        try {
            return this.prisma.$transaction(async (prisma) => {
                const product = await prisma.product.create({
                    data: {
                        ...fields,
                        slug: (0, slugify_1.default)(fields.name, { lower: true }),
                        sku: fields?.sku ?? this.generateSKU(),
                        admin: {
                            connect: { id: admin_id },
                        },
                        descriptions: {
                            createMany: {
                                data: descriptions.map(({ ...fields }) => ({ ...fields })),
                            },
                        },
                        categories: {
                            connect: categories.map(({ id }) => ({ id })),
                        },
                    },
                    include: product_output_1.productRelativeFields,
                });
                await Promise.all(images.map(({ url, name, is_main }) => prisma.image.upsert({
                    where: { url, product_id: product.id },
                    update: { is_main, name },
                    create: { url, name, is_main, product: { connect: { id: product.id } } },
                })));
                return product;
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async update(admin_id, { id, descriptions, images, ...updateFields }) {
        return this.prisma.$transaction(async (prisma) => {
            const descIds = await Promise.all(descriptions.map(({ id: desc_id = -1, head, body }) => {
                return prisma.description.upsert({
                    where: { id: desc_id },
                    update: { head, body },
                    create: { head, body, product: { connect: { id } } },
                    select: { id: true },
                });
            })).then((data) => data.map((obj) => obj.id));
            const imgIds = await Promise.all(images.map(({ url, name, is_main }) => {
                return prisma.image.upsert({
                    where: { url },
                    update: { is_main },
                    create: { url, name, is_main, product: { connect: { id } } },
                    select: { id: true },
                });
            })).then((data) => data.map((obj) => obj.id));
            return prisma.product.update({
                where: { id },
                data: {
                    admin_id,
                    ...updateFields,
                    images: {
                        deleteMany: {
                            id: { notIn: imgIds },
                            product_id: id,
                        },
                    },
                    descriptions: {
                        deleteMany: {
                            id: { notIn: descIds },
                            product_id: id,
                        },
                    },
                    categories: {
                        set: updateFields.categories.map((category) => ({ id: category.id })),
                    },
                },
                include: product_output_1.productRelativeFields,
            });
        });
    }
    async remove(id) {
        const deletedProduct = await this.prisma.product.delete({ where: { id } });
        await this.prisma.description.deleteMany({ where: { product_id: deletedProduct.id } });
        return deletedProduct;
    }
    async findManyBySearch(pattern, max = 10) {
        return this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        descriptions: {
                            some: {
                                OR: [{ head: { contains: pattern } }, { body: { contains: pattern } }],
                            },
                        },
                    },
                    { name: { contains: pattern } },
                ],
            },
            take: max,
            include: product_output_1.productRelativeFields,
        });
    }
    async getMany(skip, take = 10) {
        return this.prisma.product.findMany({
            skip,
            take,
            include: product_output_1.productRelativeFields,
        });
    }
    async getCount() {
        return this.prisma.product.count();
    }
    async getByID(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: product_output_1.productRelativeFields,
        });
    }
    async setMainImage(product_id, imageId) {
        return this.prisma.$transaction(async (prisma) => {
            const currentMainImage = await prisma.image.findFirst({
                where: { product_id, is_main: true },
            });
            if (currentMainImage) {
                await prisma.image.update({
                    where: { id: currentMainImage.id },
                    data: { is_main: false },
                });
            }
            await prisma.image.update({
                where: { id: imageId, product_id },
                data: { is_main: true },
            });
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ProductService);
//# sourceMappingURL=product.service.js.map