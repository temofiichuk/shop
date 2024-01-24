// Define Model Types

import {
  EnumAdminType,
  EnumOrderStatus,
  EnumReviewStatus,
  EnumUserRole,
} from "@/types/enums";
import { User } from "next-auth";

export type Admin = {
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
  created_at: Date;
  updated_at: Date;
  subcategories: Subcategory[];
  products: Product[];
  slug: string;
};

export type Subcategory = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  products: Product[];
  category?: Category;
  category_id?: number | null;
  slug: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  slug: string;
  created_at: Date;
  updated_at: Date;
  descriptions: Description[];
  stock: number;
  rating: number;
  images: Image[];
  reviews: Review[];
  admin?: Admin;
  admin_id?: number | null;
  category?: Category;
  category_id?: number | null;
  subcategory?: Subcategory;
  subcategory_id?: number | null;
  order_items: OrderItem[];
  user?: User;
  user_id?: number | null;
  attributes: Attribute[];
  combinations: Combination[];
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
  id: number;
  name: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  product?: Product;
  product_id?: number | null;
};

export type Description = {
  id: number;
  head: string;
  body: string;
  created_at: Date;
  updated_at: Date;
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
