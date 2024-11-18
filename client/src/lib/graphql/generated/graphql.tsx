import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  is_active: Scalars['Boolean']['output'];
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Attribute = {
  __typename?: 'Attribute';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  product: Product;
  product_id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  values: Array<ProductAttributeValue>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user?: Maybe<AuthUser>;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  last_name: Scalars['String']['output'];
  role: EnumUserRole;
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  parent: Category;
  parent_id?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ConnectCategoryInput = {
  id: Scalars['Int']['input'];
};

export type CreateAdminInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type CreateAttributeInput = {
  name: Scalars['String']['input'];
  values: Array<CreateProductAttributeValueInput>;
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrderInput = {
  order_items: Array<CreateOrderItemInput>;
  total_price: Scalars['Int']['input'];
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateOrderItemInput = {
  order_id: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
  product_variant_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateProductAttributeInput = {
  name: Scalars['String']['input'];
  values: Array<CreateProductAttributeValueInput>;
};

export type CreateProductAttributeValueInput = {
  value: Scalars['String']['input'];
};

export type CreateProductImageInput = {
  is_main?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  product_id: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type CreateProductInput = {
  attributes?: InputMaybe<Array<CreateProductAttributeInput>>;
  base_price: Scalars['Int']['input'];
  categories?: InputMaybe<Array<ConnectCategoryInput>>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  variants?: InputMaybe<Array<CreateProductVariantInput>>;
};

export type CreateProductPromotionInput = {
  product_id: Scalars['Int']['input'];
  promotion_id: Scalars['Int']['input'];
};

export type CreateProductVariantAttributeInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateProductVariantInput = {
  price: Scalars['Int']['input'];
  product_image_id?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
  variant_attributes?: InputMaybe<Array<CreateProductVariantAttributeInput>>;
};

export type CreatePromotionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  discount_type: EnumDiscountType;
  end_date: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type CreateReviewInput = {
  comment: Scalars['String']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  status: EnumReviewStatus;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  image: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWishlistInput = {
  product_id?: InputMaybe<Scalars['Int']['input']>;
  product_variant_id?: InputMaybe<Scalars['Int']['input']>;
  user_id: Scalars['Int']['input'];
};

export type DateFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum EnumDiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export enum EnumReviewStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum EnumUserRole {
  Admin = 'ADMIN',
  Rootadmin = 'ROOTADMIN',
  User = 'USER'
}

export type FilterProductInput = {
  date: DateFilter;
  name: StringFilter;
  price: IntFilter;
};

export type FilterUserInput = {
  pagination: PaginationInput;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToWishlist: Wishlist;
  adminCreate: Admin;
  adminRemove: Admin;
  adminUpdate: Admin;
  createAttributeValue: Attribute;
  createCategory: Category;
  createOrder: Order;
  createOrderItem: OrderItem;
  createProduct: Product;
  createProductAttributeValue: ProductAttributeValue;
  createProductImage: ProductImage;
  createProductPromotion: ProductPromotion;
  createProductVariant: ProductVariant;
  createPromotion: Promotion;
  createReview: Review;
  deleteFromWishlist: Wishlist;
  deleteOrder: Order;
  deleteOrderItem: OrderItem;
  deleteProduct: Product;
  deleteProductImage: ProductImage;
  deleteProductPromotion: ProductPromotion;
  deletePromotion: Promotion;
  deleteReview: Review;
  removeAttributeValue: Attribute;
  removeCategory: Category;
  removeProductAttributeValue: ProductAttributeValue;
  removeProductVariant: ProductVariant;
  updateAttributeValue: Attribute;
  updateCategory: Category;
  updateOrder: Order;
  updateOrderItem: OrderItem;
  updateProduct: Product;
  updateProductAttributeValue: ProductAttributeValue;
  updateProductImage: ProductImage;
  updateProductPromotion: ProductPromotion;
  updateProductVariant: ProductVariant;
  updatePromotion: Promotion;
  updateReview: Review;
  updateWishlist: Wishlist;
  userCreate: User;
  userRemove: User;
  userUpdate: User;
};


export type MutationAddToWishlistArgs = {
  data: CreateWishlistInput;
};


export type MutationAdminCreateArgs = {
  createAdminInput: CreateAdminInput;
};


export type MutationAdminUpdateArgs = {
  updateAdminInput: UpdateAdminInput;
};


export type MutationCreateAttributeValueArgs = {
  data: CreateAttributeInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
};


export type MutationCreateOrderItemArgs = {
  data: CreateOrderItemInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateProductAttributeValueArgs = {
  createData: CreateProductAttributeValueInput;
};


export type MutationCreateProductImageArgs = {
  data: CreateProductImageInput;
};


export type MutationCreateProductPromotionArgs = {
  data: CreateProductPromotionInput;
};


export type MutationCreateProductVariantArgs = {
  createData: CreateProductVariantInput;
};


export type MutationCreatePromotionArgs = {
  data: CreatePromotionInput;
};


export type MutationCreateReviewArgs = {
  data: CreateReviewInput;
};


export type MutationDeleteFromWishlistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProductImageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProductPromotionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePromotionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveAttributeValueArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductAttributeValueArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductVariantArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAttributeValueArgs = {
  data: UpdateAttributeInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateOrderArgs = {
  data: UpdateOrderInput;
};


export type MutationUpdateOrderItemArgs = {
  data: UpdateOrderItemInput;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationUpdateProductAttributeValueArgs = {
  updateData: UpdateProductAttributeValueInput;
};


export type MutationUpdateProductImageArgs = {
  data: UpdateProductImageInput;
};


export type MutationUpdateProductPromotionArgs = {
  data: UpdateProductPromotionInput;
};


export type MutationUpdateProductVariantArgs = {
  updateData: UpdateProductVariantInput;
};


export type MutationUpdatePromotionArgs = {
  data: UpdatePromotionInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateReviewArgs = {
  data: UpdateReviewInput;
};


export type MutationUpdateWishlistArgs = {
  data: UpdateWishlistInput;
  id: Scalars['Int']['input'];
};


export type MutationUserCreateArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUserUpdateArgs = {
  updateUserInput: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  order_items: Array<OrderItem>;
  status: Scalars['String']['output'];
  total_price: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type OrderFilterInput = {
  created_at: DateFilter;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  order: Order;
  order_id?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  product_variant: ProductVariant;
  product_variant_id: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type PaginationInput = {
  page: Scalars['Float']['input'];
  take: Scalars['Float']['input'];
};

export type Product = {
  __typename?: 'Product';
  admin?: Maybe<Admin>;
  admin_id?: Maybe<Scalars['Int']['output']>;
  attributes?: Maybe<Array<ProductAttribute>>;
  base_price: Scalars['Int']['output'];
  categories?: Maybe<Array<Category>>;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Array<ProductImage>>;
  name: Scalars['String']['output'];
  promotions?: Maybe<Array<ProductPromotion>>;
  rating: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  sku?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  variants?: Maybe<Array<ProductVariant>>;
  wishlist?: Maybe<Array<Wishlist>>;
};

export type ProductAttribute = {
  __typename?: 'ProductAttribute';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  product: Product;
  product_id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  values: Array<ProductAttributeValue>;
};

export type ProductAttributeValue = {
  __typename?: 'ProductAttributeValue';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product_attribute: ProductAttribute;
  product_attribute_id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type ProductCount = {
  __typename?: 'ProductCount';
  count: Scalars['Float']['output'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  is_main: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  product: Product;
  product_id?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ProductPromotion = {
  __typename?: 'ProductPromotion';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['Int']['output'];
  promotion: Promotion;
  promotion_id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  order_items: Array<OrderItem>;
  price: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['Int']['output'];
  product_image: Array<ProductImage>;
  product_image_id?: Maybe<Scalars['Int']['output']>;
  sku: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  variant_attributes: Array<ProductVariantAttribute>;
  wishlist: Array<Wishlist>;
};

export type ProductVariantAttribute = {
  __typename?: 'ProductVariantAttribute';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Promotion = {
  __typename?: 'Promotion';
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  discount_type: EnumDiscountType;
  end_data?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  promotions: Array<ProductPromotion>;
  start_date?: Maybe<Scalars['DateTime']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminById: Admin;
  attribute: Attribute;
  attributes: Array<Attribute>;
  authAdminLogin: AuthResponse;
  authAdminNewTokens: AuthResponse;
  authUserLogin: AuthResponse;
  authUserNewTokens: AuthResponse;
  categories: Array<Category>;
  category: Category;
  order: Order;
  orderItem: OrderItem;
  orderItems: Array<OrderItem>;
  orders: Array<Order>;
  product: Product;
  productAttribute: ProductAttribute;
  productAttributes: Array<ProductAttribute>;
  productImage: ProductImage;
  productImages: Array<ProductImage>;
  productPromotion: ProductPromotion;
  productPromotions: Array<ProductPromotion>;
  productVariant: ProductVariant;
  productVariants: Array<ProductVariant>;
  products: Array<Product>;
  productsCount: ProductCount;
  promotion: Promotion;
  promotions: Array<Promotion>;
  revenue: Revenue;
  revenueAnalytics: Array<RevenueAnalytics>;
  review: Review;
  reviews: Array<Review>;
  userById: User;
  userWishlist: Array<Wishlist>;
  users: Array<User>;
  wishlistItem: Wishlist;
  wishlists: Array<Wishlist>;
};


export type QueryAdminByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAuthAdminLoginArgs = {
  loginInput: LoginInput;
};


export type QueryAuthAdminNewTokensArgs = {
  refresh_token: Scalars['String']['input'];
};


export type QueryAuthUserLoginArgs = {
  loginInput: LoginInput;
};


export type QueryAuthUserNewTokensArgs = {
  refresh_token: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrdersArgs = {
  filter?: InputMaybe<OrderFilterInput>;
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductImageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductImagesArgs = {
  product_id: Scalars['Float']['input'];
};


export type QueryProductPromotionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductVariantArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductVariantsArgs = {
  product_id: Scalars['Float']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<FilterProductInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryPromotionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRevenueArgs = {
  revenueInput: RevenueInput;
};


export type QueryRevenueAnalyticsArgs = {
  revenueInput: RevenueInput;
};


export type QueryReviewArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QueryWishlistItemArgs = {
  id: Scalars['Int']['input'];
};

export type Revenue = {
  __typename?: 'Revenue';
  current: Scalars['Int']['output'];
  previous: Scalars['Int']['output'];
};

export type RevenueAnalytics = {
  __typename?: 'RevenueAnalytics';
  period: Scalars['String']['output'];
  revenue: Scalars['Int']['output'];
};

export type RevenueInput = {
  period: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  product_id?: Maybe<Scalars['Int']['output']>;
  status: EnumReviewStatus;
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAttributeInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<CreateProductAttributeValueInput>>;
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  id: Scalars['Int']['input'];
  order_items?: InputMaybe<Array<CreateOrderItemInput>>;
  total_price?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrderItemInput = {
  id: Scalars['Int']['input'];
  order_id?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  product_variant_id?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductAttributeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<CreateProductAttributeValueInput>>;
};

export type UpdateProductAttributeValueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductImageInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  is_main?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  attributes?: InputMaybe<Array<UpdateProductAttributeInput>>;
  base_price?: InputMaybe<Scalars['Int']['input']>;
  categories?: InputMaybe<Array<ConnectCategoryInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  variants?: InputMaybe<Array<UpdateProductVariantInput>>;
};

export type UpdateProductPromotionInput = {
  id: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  promotion_id?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductVariantAttributeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UpdateProductVariantInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Int']['input'];
  product_image_id?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
  variant_attributes?: InputMaybe<Array<UpdateProductVariantAttributeInput>>;
};

export type UpdatePromotionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  discount_type?: InputMaybe<EnumDiscountType>;
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EnumReviewStatus>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWishlistInput = {
  id: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  product_variant_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  is_verified: Scalars['Boolean']['output'];
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  updated_at: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type Wishlist = {
  __typename?: 'Wishlist';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  product_id?: Maybe<Scalars['Int']['output']>;
  product_variant: ProductVariant;
  product_variant_id?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['Int']['output'];
};

export type AttributesQueryVariables = Exact<{ [key: string]: never; }>;


export type AttributesQuery = { __typename?: 'Query', attributes: Array<{ __typename?: 'Attribute', id: number, name: string, created_at: any, values: Array<{ __typename?: 'ProductAttributeValue', id: number, value: string }> }> };

export type All_AttributesQueryVariables = Exact<{ [key: string]: never; }>;


export type All_AttributesQuery = { __typename?: 'Query', attributes: Array<{ __typename?: 'Attribute', name: string, values: Array<{ __typename?: 'ProductAttributeValue', value: string }> }> };

export type AuthUserFragmentFragment = { __typename?: 'AuthUser', id: number, first_name: string, last_name: string, email: string };

export type AuthAdminLoginQueryVariables = Exact<{
  loginInput: LoginInput;
}>;


export type AuthAdminLoginQuery = { __typename?: 'Query', authAdminLogin: { __typename?: 'AuthResponse', refreshToken: string, accessToken: string, user?: { __typename?: 'AuthUser', role: EnumUserRole, id: number, first_name: string, last_name: string, email: string } | null } };

export type AuthUserLoginQueryVariables = Exact<{
  loginInput: LoginInput;
}>;


export type AuthUserLoginQuery = { __typename?: 'Query', authUserLogin: { __typename?: 'AuthResponse', refreshToken: string, accessToken: string, user?: { __typename?: 'AuthUser', id: number, first_name: string, last_name: string, email: string } | null } };

export type AuthUserNewTokensQueryVariables = Exact<{
  refresh_token: Scalars['String']['input'];
}>;


export type AuthUserNewTokensQuery = { __typename?: 'Query', authUserNewTokens: { __typename?: 'AuthResponse', refreshToken: string, accessToken: string, user?: { __typename?: 'AuthUser', id: number, first_name: string, last_name: string, email: string } | null } };

export type AuthAdminNewTokensQueryVariables = Exact<{
  refresh_token: Scalars['String']['input'];
}>;


export type AuthAdminNewTokensQuery = { __typename?: 'Query', authAdminNewTokens: { __typename?: 'AuthResponse', refreshToken: string, accessToken: string, user?: { __typename?: 'AuthUser', id: number, first_name: string, last_name: string, email: string, role: EnumUserRole } | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, parent_id?: number | null, created_at: any }> };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, parent_id?: number | null, children: Array<{ __typename?: 'Category', id: number, name: string }> } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, parent_id?: number | null, children: Array<{ __typename?: 'Category', id: number, name: string }> } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'Category', id: number } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', first_name: string, last_name: string, is_verified: boolean, email: string, image?: string | null, rating?: number | null, created_at: any }> };

export type UserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserQuery = { __typename?: 'Query', userById: { __typename?: 'User', first_name: string, last_name: string, is_verified: boolean, email: string, image?: string | null, rating?: number | null, created_at: any } };

export type OrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrderFilterInput>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: number, status: string, created_at: any, total_price: number, user: { __typename?: 'User', first_name: string, last_name: string, email: string } }> };

export type OrderQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: number, status: string, total_price: number, created_at: any, updated_at: any, user: { __typename?: 'User', first_name: string, last_name: string, email: string, phone?: string | null, address?: string | null }, order_items: Array<{ __typename?: 'OrderItem', id: number, quantity: number, price: number, product_variant: { __typename?: 'ProductVariant', id: number, price: number, product: { __typename?: 'Product', name: string }, variant_attributes: Array<{ __typename?: 'ProductVariantAttribute', name: string, value: string }> } }> } };

export type DeleteOrderMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteOrder: { __typename?: 'Order', id: number } };

export type ProductsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, base_price: number, created_at: any, stock: number, images?: Array<{ __typename?: 'ProductImage', url: string, is_main: boolean, name: string }> | null }> };

export type ProductFragmentFragment = { __typename?: 'Product', id: number, name: string, description: string, base_price: number, created_at: any, stock: number, images?: Array<{ __typename?: 'ProductImage', url: string, is_main: boolean, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: number, stock: number, price: number, sku: string, variant_attributes: Array<{ __typename?: 'ProductVariantAttribute', name: string, value: string }> }> | null, attributes?: Array<{ __typename?: 'ProductAttribute', id: number, name: string, values: Array<{ __typename?: 'ProductAttributeValue', value: string }> }> | null, categories?: Array<{ __typename?: 'Category', id: number }> | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, name: string, description: string, base_price: number, created_at: any, stock: number, images?: Array<{ __typename?: 'ProductImage', url: string, is_main: boolean, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: number, stock: number, price: number, sku: string, variant_attributes: Array<{ __typename?: 'ProductVariantAttribute', name: string, value: string }> }> | null, attributes?: Array<{ __typename?: 'ProductAttribute', id: number, name: string, values: Array<{ __typename?: 'ProductAttributeValue', value: string }> }> | null, categories?: Array<{ __typename?: 'Category', id: number }> | null } };

export type UpdateProductMutationVariables = Exact<{
  data: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: number, name: string, description: string, base_price: number, created_at: any, stock: number, images?: Array<{ __typename?: 'ProductImage', url: string, is_main: boolean, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: number, stock: number, price: number, sku: string, variant_attributes: Array<{ __typename?: 'ProductVariantAttribute', name: string, value: string }> }> | null, attributes?: Array<{ __typename?: 'ProductAttribute', id: number, name: string, values: Array<{ __typename?: 'ProductAttributeValue', value: string }> }> | null, categories?: Array<{ __typename?: 'Category', id: number }> | null } };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: number, name: string, description: string, base_price: number, created_at: any, stock: number, images?: Array<{ __typename?: 'ProductImage', url: string, is_main: boolean, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: number, stock: number, price: number, sku: string, variant_attributes: Array<{ __typename?: 'ProductVariantAttribute', name: string, value: string }> }> | null, attributes?: Array<{ __typename?: 'ProductAttribute', id: number, name: string, values: Array<{ __typename?: 'ProductAttributeValue', value: string }> }> | null, categories?: Array<{ __typename?: 'Category', id: number }> | null } };

export type ProductsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsCountQuery = { __typename?: 'Query', productsCount: { __typename?: 'ProductCount', count: number } };

export type PromotionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionsQuery = { __typename?: 'Query', promotions: Array<{ __typename?: 'Promotion', name: string, discount_type: EnumDiscountType, start_date?: any | null, end_data?: any | null, created_at: any }> };

export type RevenueQueryVariables = Exact<{
  revenueInput: RevenueInput;
}>;


export type RevenueQuery = { __typename?: 'Query', revenue: { __typename?: 'Revenue', current: number, previous: number } };

export type RevenueAnalyticsQueryVariables = Exact<{
  revenueInput: RevenueInput;
}>;


export type RevenueAnalyticsQuery = { __typename?: 'Query', revenueAnalytics: Array<{ __typename?: 'RevenueAnalytics', period: string, revenue: number }> };

export type ReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', id: number, created_at: any, status: EnumReviewStatus, comment: string, user: { __typename?: 'User', email: string }, product: { __typename?: 'Product', name: string } }> };

export const AuthUserFragmentFragmentDoc = gql`
    fragment AuthUserFragment on AuthUser {
  id
  first_name
  last_name
  email
}
    `;
export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  name
  description
  base_price
  created_at
  stock
  images {
    url
    is_main
    name
  }
  variants {
    id
    stock
    price
    sku
    variant_attributes {
      name
      value
    }
  }
  attributes {
    id
    name
    values {
      value
    }
  }
  categories {
    id
  }
}
    `;
export const AttributesDocument = gql`
    query attributes {
  attributes {
    id
    name
    created_at
    values {
      id
      value
    }
  }
}
    `;

/**
 * __useAttributesQuery__
 *
 * To run a query within a React component, call `useAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAttributesQuery(baseOptions?: Apollo.QueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
      }
export function useAttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
        }
export function useAttributesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
        }
export type AttributesQueryHookResult = ReturnType<typeof useAttributesQuery>;
export type AttributesLazyQueryHookResult = ReturnType<typeof useAttributesLazyQuery>;
export type AttributesSuspenseQueryHookResult = ReturnType<typeof useAttributesSuspenseQuery>;
export type AttributesQueryResult = Apollo.QueryResult<AttributesQuery, AttributesQueryVariables>;
export const All_AttributesDocument = gql`
    query all_attributes {
  attributes {
    name
    values {
      value
    }
  }
}
    `;

/**
 * __useAll_AttributesQuery__
 *
 * To run a query within a React component, call `useAll_AttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAll_AttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAll_AttributesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAll_AttributesQuery(baseOptions?: Apollo.QueryHookOptions<All_AttributesQuery, All_AttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<All_AttributesQuery, All_AttributesQueryVariables>(All_AttributesDocument, options);
      }
export function useAll_AttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<All_AttributesQuery, All_AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<All_AttributesQuery, All_AttributesQueryVariables>(All_AttributesDocument, options);
        }
export function useAll_AttributesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<All_AttributesQuery, All_AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<All_AttributesQuery, All_AttributesQueryVariables>(All_AttributesDocument, options);
        }
export type All_AttributesQueryHookResult = ReturnType<typeof useAll_AttributesQuery>;
export type All_AttributesLazyQueryHookResult = ReturnType<typeof useAll_AttributesLazyQuery>;
export type All_AttributesSuspenseQueryHookResult = ReturnType<typeof useAll_AttributesSuspenseQuery>;
export type All_AttributesQueryResult = Apollo.QueryResult<All_AttributesQuery, All_AttributesQueryVariables>;
export const AuthAdminLoginDocument = gql`
    query authAdminLogin($loginInput: LoginInput!) {
  authAdminLogin(loginInput: $loginInput) {
    user {
      ...AuthUserFragment
      role
    }
    refreshToken
    accessToken
  }
}
    ${AuthUserFragmentFragmentDoc}`;

/**
 * __useAuthAdminLoginQuery__
 *
 * To run a query within a React component, call `useAuthAdminLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthAdminLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthAdminLoginQuery({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useAuthAdminLoginQuery(baseOptions: Apollo.QueryHookOptions<AuthAdminLoginQuery, AuthAdminLoginQueryVariables> & ({ variables: AuthAdminLoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthAdminLoginQuery, AuthAdminLoginQueryVariables>(AuthAdminLoginDocument, options);
      }
export function useAuthAdminLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthAdminLoginQuery, AuthAdminLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthAdminLoginQuery, AuthAdminLoginQueryVariables>(AuthAdminLoginDocument, options);
        }
export function useAuthAdminLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AuthAdminLoginQuery, AuthAdminLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthAdminLoginQuery, AuthAdminLoginQueryVariables>(AuthAdminLoginDocument, options);
        }
export type AuthAdminLoginQueryHookResult = ReturnType<typeof useAuthAdminLoginQuery>;
export type AuthAdminLoginLazyQueryHookResult = ReturnType<typeof useAuthAdminLoginLazyQuery>;
export type AuthAdminLoginSuspenseQueryHookResult = ReturnType<typeof useAuthAdminLoginSuspenseQuery>;
export type AuthAdminLoginQueryResult = Apollo.QueryResult<AuthAdminLoginQuery, AuthAdminLoginQueryVariables>;
export const AuthUserLoginDocument = gql`
    query authUserLogin($loginInput: LoginInput!) {
  authUserLogin(loginInput: $loginInput) {
    user {
      ...AuthUserFragment
    }
    refreshToken
    accessToken
  }
}
    ${AuthUserFragmentFragmentDoc}`;

/**
 * __useAuthUserLoginQuery__
 *
 * To run a query within a React component, call `useAuthUserLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserLoginQuery({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useAuthUserLoginQuery(baseOptions: Apollo.QueryHookOptions<AuthUserLoginQuery, AuthUserLoginQueryVariables> & ({ variables: AuthUserLoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUserLoginQuery, AuthUserLoginQueryVariables>(AuthUserLoginDocument, options);
      }
export function useAuthUserLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUserLoginQuery, AuthUserLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUserLoginQuery, AuthUserLoginQueryVariables>(AuthUserLoginDocument, options);
        }
export function useAuthUserLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AuthUserLoginQuery, AuthUserLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthUserLoginQuery, AuthUserLoginQueryVariables>(AuthUserLoginDocument, options);
        }
export type AuthUserLoginQueryHookResult = ReturnType<typeof useAuthUserLoginQuery>;
export type AuthUserLoginLazyQueryHookResult = ReturnType<typeof useAuthUserLoginLazyQuery>;
export type AuthUserLoginSuspenseQueryHookResult = ReturnType<typeof useAuthUserLoginSuspenseQuery>;
export type AuthUserLoginQueryResult = Apollo.QueryResult<AuthUserLoginQuery, AuthUserLoginQueryVariables>;
export const AuthUserNewTokensDocument = gql`
    query authUserNewTokens($refresh_token: String!) {
  authUserNewTokens(refresh_token: $refresh_token) {
    user {
      id
      first_name
      last_name
      email
    }
    refreshToken
    accessToken
  }
}
    `;

/**
 * __useAuthUserNewTokensQuery__
 *
 * To run a query within a React component, call `useAuthUserNewTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserNewTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserNewTokensQuery({
 *   variables: {
 *      refresh_token: // value for 'refresh_token'
 *   },
 * });
 */
export function useAuthUserNewTokensQuery(baseOptions: Apollo.QueryHookOptions<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables> & ({ variables: AuthUserNewTokensQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables>(AuthUserNewTokensDocument, options);
      }
export function useAuthUserNewTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables>(AuthUserNewTokensDocument, options);
        }
export function useAuthUserNewTokensSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables>(AuthUserNewTokensDocument, options);
        }
export type AuthUserNewTokensQueryHookResult = ReturnType<typeof useAuthUserNewTokensQuery>;
export type AuthUserNewTokensLazyQueryHookResult = ReturnType<typeof useAuthUserNewTokensLazyQuery>;
export type AuthUserNewTokensSuspenseQueryHookResult = ReturnType<typeof useAuthUserNewTokensSuspenseQuery>;
export type AuthUserNewTokensQueryResult = Apollo.QueryResult<AuthUserNewTokensQuery, AuthUserNewTokensQueryVariables>;
export const AuthAdminNewTokensDocument = gql`
    query authAdminNewTokens($refresh_token: String!) {
  authAdminNewTokens(refresh_token: $refresh_token) {
    user {
      id
      first_name
      last_name
      email
      role
    }
    refreshToken
    accessToken
  }
}
    `;

/**
 * __useAuthAdminNewTokensQuery__
 *
 * To run a query within a React component, call `useAuthAdminNewTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthAdminNewTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthAdminNewTokensQuery({
 *   variables: {
 *      refresh_token: // value for 'refresh_token'
 *   },
 * });
 */
export function useAuthAdminNewTokensQuery(baseOptions: Apollo.QueryHookOptions<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables> & ({ variables: AuthAdminNewTokensQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables>(AuthAdminNewTokensDocument, options);
      }
export function useAuthAdminNewTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables>(AuthAdminNewTokensDocument, options);
        }
export function useAuthAdminNewTokensSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables>(AuthAdminNewTokensDocument, options);
        }
export type AuthAdminNewTokensQueryHookResult = ReturnType<typeof useAuthAdminNewTokensQuery>;
export type AuthAdminNewTokensLazyQueryHookResult = ReturnType<typeof useAuthAdminNewTokensLazyQuery>;
export type AuthAdminNewTokensSuspenseQueryHookResult = ReturnType<typeof useAuthAdminNewTokensSuspenseQuery>;
export type AuthAdminNewTokensQueryResult = Apollo.QueryResult<AuthAdminNewTokensQuery, AuthAdminNewTokensQueryVariables>;
export const CategoriesDocument = gql`
    query categories {
  categories {
    id
    name
    parent_id
    created_at
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export function useCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
    name
    parent_id
    children {
      id
      name
    }
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $updateCategoryInput) {
    id
    name
    parent_id
    children {
      id
      name
    }
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: Int!) {
  removeCategory(id: $id) {
    id
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UsersDocument = gql`
    query users {
  users {
    first_name
    last_name
    is_verified
    email
    image
    rating
    created_at
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query user($id: Int!) {
  userById(id: $id) {
    first_name
    last_name
    is_verified
    email
    image
    rating
    created_at
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const OrdersDocument = gql`
    query Orders($filter: OrderFilterInput) {
  orders(filter: $filter) {
    id
    status
    created_at
    total_price
    user {
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export function useOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersSuspenseQueryHookResult = ReturnType<typeof useOrdersSuspenseQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const OrderDocument = gql`
    query Order($id: Int!) {
  order(id: $id) {
    id
    status
    total_price
    created_at
    updated_at
    user {
      first_name
      last_name
      email
      phone
      address
    }
    order_items {
      id
      product_variant {
        id
        price
        product {
          name
        }
        variant_attributes {
          name
          value
        }
      }
      quantity
      price
    }
  }
}
    `;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables> & ({ variables: OrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export function useOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderSuspenseQueryHookResult = ReturnType<typeof useOrderSuspenseQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQuery, OrderQueryVariables>;
export const DeleteOrderDocument = gql`
    mutation deleteOrder($id: Int!) {
  deleteOrder(id: $id) {
    id
  }
}
    `;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const ProductsDocument = gql`
    query products($pagination: PaginationInput) {
  products(pagination: $pagination) {
    id
    name
    base_price
    created_at
    stock
    images {
      url
      is_main
      name
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query product($id: Int!) {
  product(id: $id) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($data: UpdateProductInput!) {
  updateProduct(data: $data) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const ProductsCountDocument = gql`
    query productsCount {
  productsCount {
    count
  }
}
    `;

/**
 * __useProductsCountQuery__
 *
 * To run a query within a React component, call `useProductsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsCountQuery(baseOptions?: Apollo.QueryHookOptions<ProductsCountQuery, ProductsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsCountQuery, ProductsCountQueryVariables>(ProductsCountDocument, options);
      }
export function useProductsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsCountQuery, ProductsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsCountQuery, ProductsCountQueryVariables>(ProductsCountDocument, options);
        }
export function useProductsCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductsCountQuery, ProductsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsCountQuery, ProductsCountQueryVariables>(ProductsCountDocument, options);
        }
export type ProductsCountQueryHookResult = ReturnType<typeof useProductsCountQuery>;
export type ProductsCountLazyQueryHookResult = ReturnType<typeof useProductsCountLazyQuery>;
export type ProductsCountSuspenseQueryHookResult = ReturnType<typeof useProductsCountSuspenseQuery>;
export type ProductsCountQueryResult = Apollo.QueryResult<ProductsCountQuery, ProductsCountQueryVariables>;
export const PromotionsDocument = gql`
    query Promotions {
  promotions {
    name
    discount_type
    start_date
    end_data
    created_at
  }
}
    `;

/**
 * __usePromotionsQuery__
 *
 * To run a query within a React component, call `usePromotionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePromotionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePromotionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePromotionsQuery(baseOptions?: Apollo.QueryHookOptions<PromotionsQuery, PromotionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PromotionsQuery, PromotionsQueryVariables>(PromotionsDocument, options);
      }
export function usePromotionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PromotionsQuery, PromotionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PromotionsQuery, PromotionsQueryVariables>(PromotionsDocument, options);
        }
export function usePromotionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PromotionsQuery, PromotionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PromotionsQuery, PromotionsQueryVariables>(PromotionsDocument, options);
        }
export type PromotionsQueryHookResult = ReturnType<typeof usePromotionsQuery>;
export type PromotionsLazyQueryHookResult = ReturnType<typeof usePromotionsLazyQuery>;
export type PromotionsSuspenseQueryHookResult = ReturnType<typeof usePromotionsSuspenseQuery>;
export type PromotionsQueryResult = Apollo.QueryResult<PromotionsQuery, PromotionsQueryVariables>;
export const RevenueDocument = gql`
    query Revenue($revenueInput: RevenueInput!) {
  revenue(revenueInput: $revenueInput) {
    current
    previous
  }
}
    `;

/**
 * __useRevenueQuery__
 *
 * To run a query within a React component, call `useRevenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueQuery({
 *   variables: {
 *      revenueInput: // value for 'revenueInput'
 *   },
 * });
 */
export function useRevenueQuery(baseOptions: Apollo.QueryHookOptions<RevenueQuery, RevenueQueryVariables> & ({ variables: RevenueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevenueQuery, RevenueQueryVariables>(RevenueDocument, options);
      }
export function useRevenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevenueQuery, RevenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevenueQuery, RevenueQueryVariables>(RevenueDocument, options);
        }
export function useRevenueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RevenueQuery, RevenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RevenueQuery, RevenueQueryVariables>(RevenueDocument, options);
        }
export type RevenueQueryHookResult = ReturnType<typeof useRevenueQuery>;
export type RevenueLazyQueryHookResult = ReturnType<typeof useRevenueLazyQuery>;
export type RevenueSuspenseQueryHookResult = ReturnType<typeof useRevenueSuspenseQuery>;
export type RevenueQueryResult = Apollo.QueryResult<RevenueQuery, RevenueQueryVariables>;
export const RevenueAnalyticsDocument = gql`
    query RevenueAnalytics($revenueInput: RevenueInput!) {
  revenueAnalytics(revenueInput: $revenueInput) {
    period
    revenue
  }
}
    `;

/**
 * __useRevenueAnalyticsQuery__
 *
 * To run a query within a React component, call `useRevenueAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueAnalyticsQuery({
 *   variables: {
 *      revenueInput: // value for 'revenueInput'
 *   },
 * });
 */
export function useRevenueAnalyticsQuery(baseOptions: Apollo.QueryHookOptions<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables> & ({ variables: RevenueAnalyticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables>(RevenueAnalyticsDocument, options);
      }
export function useRevenueAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables>(RevenueAnalyticsDocument, options);
        }
export function useRevenueAnalyticsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables>(RevenueAnalyticsDocument, options);
        }
export type RevenueAnalyticsQueryHookResult = ReturnType<typeof useRevenueAnalyticsQuery>;
export type RevenueAnalyticsLazyQueryHookResult = ReturnType<typeof useRevenueAnalyticsLazyQuery>;
export type RevenueAnalyticsSuspenseQueryHookResult = ReturnType<typeof useRevenueAnalyticsSuspenseQuery>;
export type RevenueAnalyticsQueryResult = Apollo.QueryResult<RevenueAnalyticsQuery, RevenueAnalyticsQueryVariables>;
export const ReviewsDocument = gql`
    query reviews {
  reviews {
    user {
      email
    }
    product {
      name
    }
    id
    created_at
    status
    comment
  }
}
    `;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useReviewsQuery(baseOptions?: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export function useReviewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsSuspenseQueryHookResult = ReturnType<typeof useReviewsSuspenseQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;