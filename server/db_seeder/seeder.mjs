import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();


async function seedUsers() {
	for (let i = 0; i < 10; i++) {
		await prisma.user.create({
			data: {
				username: faker.unique(faker.internet.userName),
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.unique(faker.internet.email),
				password: faker.internet.password(),
				phone: faker.phone.phoneNumber(),
				address: faker.address.streetAddress(),
				is_verified: faker.datatype.boolean(),
				image: faker.image.avatar(),
			},
		});
	}
}

async function seedAdmins() {
	for (let i = 0; i < 3; i++) {
		await prisma.admin.create({
			data: {
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.unique(faker.internet.email),
				password: faker.internet.password(),
				role: faker.helpers.arrayElement(["ROOTADMIN", "ADMIN"]),
				is_active: faker.datatype.boolean(),
			},
		});
	}
}

async function seedProducts() {
	for (let i = 0; i < 5; i++) {
		const name = faker.unique(faker.commerce.productName);
		await prisma.product.create({
			data: {
				name,
				description: faker.commerce.productDescription(),
				sku: faker.unique(faker.datatype.uuid),
				base_price: faker.datatype.number({ min: 10, max: 1000 }),
				slug: faker.helpers.slugify(name),
				stock: faker.datatype.number({ min: 0, max: 100 }),
				rating: faker.datatype.number({ min: 0, max: 5 }),
			},
		});
	}
}

async function seedCategories() {
	for (let i = 0; i < 5; i++) {
		const categories = await prisma.category.findMany();
		const name = faker.unique(faker.commerce.department);
		await prisma.category.create({
			data: {
				name,
				slug: faker.helpers.slugify(name),
				parent_id: faker.helpers.arrayElement(categories).id,
			},
		});
	}
}

async function seedProductAttributes() {
	for (let i = 0; i < 5; i++) {
		await prisma.productAttribute.create({
			data: {
				name: faker.unique(faker.commerce.productMaterial),
			},
		});
	}
}

async function seedProductVariants() {
	const products = await prisma.product.findMany();
	const attributes = await prisma.productAttribute.findMany();

	for (let i = 0; i < 10; i++) {
		await prisma.productVariant.create({
			data: {
				product_id: faker.helpers.arrayElement(products).id,
				attribute_id: faker.helpers.arrayElement(attributes).id,
				value: faker.commerce.department(),
				price_modifier: faker.datatype.number({ min: -100, max: 100 }),
				stock_quantity: faker.datatype.number({ min: 0, max: 50 }),
			},
		});
	}
}

async function seedWishlists() {
	const users = await prisma.user.findMany();
	const products = await prisma.product.findMany();
	const productVariants = await prisma.productVariant.findMany();

	for (let i = 0; i < 10; i++) {
		await prisma.wishlist.create({
			data: {
				user_id: faker.helpers.arrayElement(users).id,
				product_id: faker.helpers.arrayElement(products)?.id || null,
				product_variant_id: faker.helpers.arrayElement(productVariants)?.id || null,
			},
		});
	}
}

async function seedProductImages() {
	const products = await prisma.product.findMany();

	for (let i = 0; i < 10; i++) {
		const product = faker.helpers.arrayElement(products);
		const hasProductMainImage = await prisma.productImage.findMany({
			where: {
				product_id: product.id,
				is_main: true,
			},
		});

		await prisma.productImage.create({
			data: {
				product_id: product.id,
				name: faker.image.image(),
				url: faker.image.imageUrl(),
				is_main: !(!!hasProductMainImage.length),
			},
		});
	}
}

async function seedPromotions() {
	for (let i = 0; i < 3; i++) {
		await prisma.promotion.create({
			data: {
				name: faker.word.adjective(),
				description: faker.lorem.sentence(),
				start_date: faker.date.past(),
				end_data: faker.date.future(),
				discount_type: faker.helpers.arrayElement(["FIXED", "PERCENTAGE"]),
			},
		});
	}
}

async function seedProductPromotions() {
	const products = await prisma.product.findMany();
	const promotions = await prisma.promotion.findMany();

	for (let i = 0; i < 5; i++) {
		await prisma.productPromotion.create({
			data: {
				product_id: faker.helpers.arrayElement(products).id,
				promotion_id: faker.helpers.arrayElement(promotions).id,
			},
		});
	}
}

async function seedReviews() {
	const products = await prisma.product.findMany();
	const users = await prisma.user.findMany();

	for (let i = 0; i < 10; i++) {
		await prisma.review.create({
			data: {
				comment: faker.lorem.sentence(),
				product_id: faker.helpers.arrayElement(products)?.id || null,
				user_id: faker.helpers.arrayElement(users)?.id || null,
				status: faker.helpers.arrayElement(["PENDING", "APPROVED", "REJECTED"]),
			},
		});
	}
}

async function seedOrders() {
	const users = await prisma.user.findMany();

	for (let i = 0; i < 5; i++) {
		const order = await prisma.order.create({
			data: {
				user_id: faker.helpers.arrayElement(users)?.id || null,
				total_price: faker.datatype.number({ min: 20, max: 500 }),
				status: faker.helpers.arrayElement(["PENDING", "CANCELED", "AWAITING_PAYMENT", "PAYED", "SHIPPED", "DELIVERED", "FINISHED"]),
			},
		});

		// Create order items for each order
		for (let j = 0; j < 3; j++) {
			const variants = await prisma.productVariant.findMany();
			const variant = faker.helpers.arrayElement(variants);
			const quantity = faker.datatype.number({ min: 1, max: 5 });
			const price = variant.price_modifier;
			await prisma.orderItem.create({
				data: {
					order_id: order.id,
					product_variant_id: variant.id,
					quantity,
					price,
					total_price: quantity * price,
				},
			});
		}
	}
}

// Функція для запуску всіх модулів
async function main() {
	await seedUsers();
	await seedAdmins();
	await seedProducts();
	// await seedCategories();
	// await seedProductAttributes();
	await seedProductVariants();
	await seedWishlists();
	// await seedProductImages();
	await seedPromotions();
	await seedProductPromotions();
	await seedReviews();
	await seedOrders();
	console.log("Seeding completed!");
}

// Запуск функції main
main()
	.catch(e => {
		console.error(e);
	})
	.finally(async () => {
		console.log("finish");
		await prisma.$disconnect();
	});
