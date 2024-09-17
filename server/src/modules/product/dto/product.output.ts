export const includeProductFields = {
	reviews: true,
	variants: {
		include: {
			variant_attributes: true,
		},
	},
	categories: true,
	images: true,
	promotions: true,
	attributes: {
		include: {
			values: true,
		},
	},
};