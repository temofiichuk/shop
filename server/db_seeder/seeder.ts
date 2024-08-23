// import { faker } from "@faker-js/faker";
// import { EnumAdminType, EnumUserRole, Prisma, PrismaClient } from "@prisma/client";
// import { hash } from "argon2";
// import slugify from "slugify";
//
// const prisma = new PrismaClient();
// // const createProducts = async (qty: number) => {
// // 	let count = 0;
// //
// // 	try {
// // 		await prisma.attribute.createMany({
// // 			data: Array.from({ length: 5 }, () => ({
// // 				name: faker.commerce.productAdjective(),
// // 				value: faker.commerce.productMaterial(),
// // 			})),
// // 		});
// // 	} catch (e) {}
// //
// // 	for (let i = 0; i < qty; i++) {
// // 		count++;
// // 		const productName = await getName("product", faker.commerce.productName);
// // 		const cat_id = faker.number.int({ min: 1, max: 4 });
// // 		const subcat_id = faker.number.int({ min: cat_id * 5 - 4, max: cat_id * 5 });
// //
// // 		await prisma.product.create({
// // 			data: {
// // 				admin: {
// // 					connectOrCreate: {
// // 						where: {
// // 							id: faker.number.int({ min: 1, max: 5 }),
// // 						},
// // 						create: {
// // 							name: `admin${count}`,
// // 							email: `admin${count}@admin.com`,
// // 							password: await hash("Password123"),
// // 						},
// // 					},
// // 				},
// // 				name: productName,
// // 				price: +faker.commerce.price(),
// // 				rating: faker.number.int({ min: 1, max: 5 }),
// // 				images: {
// // 					create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, (_, index) => ({
// // 						url: faker.image.url(),
// // 						name: productName,
// // 						is_main: index === 0,
// // 					})),
// // 				},
// // 				stock: faker.number.int({ min: 1, max: 100 }),
// // 				slug: customSlugify(productName),
// // 				category: {
// // 					connect: { id: cat_id },
// // 				},
// // 				subcategory: {
// // 					connect: { id: subcat_id },
// // 				},
// // 				descriptions: {
// // 					create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
// // 						head: faker.commerce.productAdjective(),
// // 						body: faker.commerce.productDescription(),
// // 					})),
// // 				},
// // 				reviews: {
// // 					create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
// // 						rating: faker.number.int({ min: 1, max: 5 }),
// // 						comment: faker.lorem.paragraph(1),
// // 					})),
// // 				},
// // 			},
// // 		});
// // 	}
// // };
//
// // async function createOrders(qty: number = 10) {
// // 	for (let i = 0; i < qty; i++) {
// // 		const orderItems = [];
// // 		const orderItemsCount = faker.number.int({ min: 1, max: 10 });
// // 		for (let i = 0; i < orderItemsCount; i++) {
// // 			const price = +faker.commerce.price();
// // 			const quantity = faker.number.int({ min: 1, max: 10 });
// // 			const total_price = quantity * price;
// //
// // 			const orderItem = await prisma.orderItem.create({
// // 				data: {
// // 					product: {
// // 						connect: {
// // 							id: faker.number.int({ min: 1, max: 30 }),
// // 						},
// // 					},
// // 					price,
// // 					quantity,
// // 					total_price,
// // 				},
// // 				select: {
// // 					id: true,
// // 					price: true,
// // 					total_price: true,
// // 					quantity: true,
// // 				},
// // 			});
// //
// // 			orderItems.push(orderItem);
// // 		}
// // 		const orderData: Prisma.OrderCreateInput = {
// // 			order_items: {
// // 				connect: Array.from(orderItems).map((item) => ({ id: item.id })),
// // 			},
// // 			user: {
// // 				connectOrCreate: {
// // 					where: {
// // 						id: faker.number.int({ min: 1, max: 30 }),
// // 					},
// // 					create: {
// // 						name: `User ${faker.person.fullName()}`,
// // 						email: `user${faker.person.firstName().toLowerCase()}@user.com`,
// // 						password: await hash("Password123"),
// // 						phone: faker.phone.number(),
// // 						avatar: faker.image.avatar(),
// // 						rating: faker.number.int({ min: 1, max: 5 }),
// // 					},
// // 				},
// // 			},
// // 			order_total_price: +orderItems.reduce((acc, item) => acc + +item.total_price, 0),
// // 		};
// //
// // 		await prisma.order.create({
// // 			data: orderData,
// // 		});
// // 	}
// // }
//
// // async function createUsers() {
// // 	try {
// // 		for (let k = 0; k < 5; k++) {
// // 			const name = faker.person.firstName();
// // 			const password = await hash("Password123");
// // 			const userRole =
// // 				faker.number.int({ min: 0, max: 1 }) > 0 ? EnumUserRole.USER : EnumUserRole.ADMIN;
// //
// // 			const isAdmin = userRole === EnumUserRole.ADMIN;
// //
// // 			if (isAdmin) {
// // 				const type =
// // 					faker.number.int({ min: 0, max: 1 }) > 0 ? EnumAdminType.ADMIN : EnumAdminType.ROOTADMIN;
// // 				await prisma.admin.create({
// // 					data: {
// // 						name,
// // 						email: `admin.${name.toLowerCase()}@admin.com`,
// // 						password,
// // 						role: EnumUserRole.ADMIN,
// // 						type,
// // 					},
// // 				});
// // 				continue;
// // 			}
// // 			await prisma.user.create({
// // 				data: {
// // 					name,
// // 					role: EnumUserRole.USER,
// // 					email: `user.${name.toLowerCase()}@user.com`,
// // 					password,
// // 				},
// // 			});
// // 		}
// // 	} catch (e) {
// // 		console.log(e);
// // 	}
// // }
//
// // async function createCat() {
// // 	try {
// // 		for (let k = 0; k < 5; k++) {
// // 			const categoryName = await getName("category", faker.commerce.department);
// // 			const subcats = [];
// //
// // 			for (let j = 0; j < 5; j++) {
// // 				const subcategoryName = await getName("subcategory", faker.commerce.product);
// //
// // 				const subcat = await prisma.subcategory.create({
// // 					data: {
// // 						name: subcategoryName,
// // 						slug: customSlugify(subcategoryName),
// // 					},
// // 				});
// // 				subcats.push({ id: subcat.id });
// // 			}
// //
// // 			await prisma.category.create({
// // 				data: {
// // 					name: categoryName,
// // 					slug: customSlugify(categoryName),
// // 					subcategories: {
// // 						connect: subcats,
// // 					},
// // 				},
// // 			});
// // 		}
// // 	} catch (e) {
// // 		console.log(e);
// // 	}
// // }
//
// // async function getName(model: string, fakeName: () => string) {
// // 	const name = fakeName();
// // 	const isName = await prisma[model].findUnique({ where: { name } });
// // 	return isName ? getName(model, fakeName) : name;
// // }
// //
// // function getCombinations<T>(array: T[]) {
// // 	const result = [];
// //
// // 	function generate(cur: [] | T[], rem: T[]) {
// // 		if (rem.length === 0) {
// // 			result.push(cur);
// // 		} else {
// // 			for (let i = 0; i < rem.length; i++) {
// // 				generate([...cur, rem[i]], rem.slice(i + 1));
// // 			}
// // 		}
// // 	}
// //
// // 	generate([], array);
// // 	return result;
// // }
//
// function createCategory() {
// 	try {
// 		return prisma.category.create({
// 			data: {
// 				parent_id: 0,
// 				name: "Man",
// 				type_name: "root",
// 				slug: slugify("Man"),
// 			},
// 		});
// 	} catch (e) {
// 		console.log(e);
// 	}
// }
//
// function customSlugify(text: string): string {
// 	return text
// 		.toString()
// 		.normalize("NFD") // Normalize to decompose combined graphemes
// 		.replace(/[\u0300-\u036f]/g, "") // Remove accents
// 		.toLowerCase()
// 		.trim()
// 		.replace(/\s+/g, "-") // Replace spaces with -
// 		.replace(/[^\w\-]+/g, "") // Remove all non-word chars
// 		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
// }
//
// async function main() {
// 	console.log("...start");
// 	// await createProducts(60);
// 	// await createOrders();
// 	// await createCat();
// 	await createUsers();
// 	// await createCategory();
// }
//
// main()
// 	.catch((err) => {
// 		console.error(err);
// 	})
// 	.finally(async () => {
// 		console.log("...finish");
// 		await prisma.$disconnect();
// 	});
