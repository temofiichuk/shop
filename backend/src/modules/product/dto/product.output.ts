import { Prisma } from "@prisma/client";

export const productRelativeFields: Prisma.ProductSelect = {
	images: true,
	descriptions: true,
};
