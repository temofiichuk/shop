// Define Model Types

import { EnumAdminType, EnumOrderStatus, EnumReviewStatus, EnumUserRole } from "@/types/enums";

export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
	avatar: string;
	type: EnumAdminType;
	role: EnumUserRole;
	created_products: Product[];
};

export type Category = {
	id: number;
	name: string;
	parent_id: number | null;
	children: Category[];
	type: CategoryType;
	type_name: string;
	created_at?: Date;
	updated_at?: Date;
	products?: Product[];
};

export type CategoryType = {
	id: number;
	name: string;
	created_at?: Date;
	updated_at?: Date;
	categories?: Category[];
};

export type Product = {
	id?: number;
	name: string;
	price: number;
	slug?: string;
	created_at?: Date;
	updated_at?: Date;
	descriptions?: Description[];
	stock: number;
	rating?: number;
	images?: ProductImage[];
	reviews?: Review[];
	admin?: User;
	admin_id?: number | null;
	categories?: Category[];
	order_items?: OrderItem[];
	user?: User;
	user_id?: number | null;
	attributes?: Attribute[];
	combinations?: Combination[];
};

export type ProductWithID = {
	id: number;
} & Product;

export type Product2 = {
	name: string;
	price: number;
	stock: number;
	images:
		| {
				name: string;
				url: string;
		  }[]
		| undefined;
	descriptions:
		| {
				head: string;
				body: string;
		  }[]
		| undefined;
};

export type Combination = {
	id: number;
	product?: Product;
	product_id?: number | null;
	attributes: Attribute[];
	price: number;
	created_at: Date;
	updated_at: Date;
};

export type Attribute = {
	id: number;
	name: string;
	values: AttributeValue[];
	product?: Product;
	product_id?: number | null;
	combination?: Combination;
	combination_id?: number | null;
	created_at: Date;
	updated_at: Date;
};

export type AttributeValue = {
	id: number;
	value: string;
	attribute: Attribute;
	attribute_id: number;
	created_at: Date;
	updated_at: Date;
};

export type Image = {
	id?: number;
	name: string;
	url: string;
	created_at?: Date;
	updated_at?: Date;
	user?: User;
	user_id?: number | null;
};

export type ProductImage = {
	id?: number;
	name: string;
	url: string;
	is_main?: boolean;
	created_at?: Date;
	updated_at?: Date;
	product?: Product;
	product_id?: number | null;
};

export type Description = {
	id?: number;
	head: string;
	body: string;
	created_at?: Date;
	updated_at?: Date;
	product?: Product;
	product_id?: number | null;
};

export type Review = {
	id: number;
	rating: number;
	comment: string;
	created_at: Date;
	updated_at: Date;
	product?: Product;
	product_id?: number | null;
	user?: User;
	user_id?: number | null;
	status: EnumReviewStatus;
};

export type Order = {
	id: number;
	created_at: Date;
	updated_at: Date;
	user?: User;
	user_id?: number | null;
	order_total_price: number;
	order_items: OrderItem[];
	status: EnumOrderStatus;
};

export type OrderItem = {
	id: number;
	combination_id?: number | null;
	quantity: number;
	price: number;
	total_price: number;
	product?: Product;
	product_id?: number | null;
	order?: Order;
	order_id?: number | null;
	created_at: Date;
	updated_at: Date;
};

// Response

export type CategoriesResponse = {
	getCategories: Category[];
};

export type CategoryTreeResponse = {
	getCategoryTree: Category[];
};

export type CategoryTypesResponse = {
	getCategoryType: CategoryType[];
};
