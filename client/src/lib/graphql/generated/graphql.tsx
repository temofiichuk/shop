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

export type CreateAdminInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
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
  price: Scalars['Int']['input'];
  product_variant_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  total_price: Scalars['Int']['input'];
};

export type CreateProductAttributeInput = {
  name: Scalars['String']['input'];
};

export type CreateProductCategoryInput = {
  category_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
};

export type CreateProductImageInput = {
  is_main?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  product_id: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type CreateProductInput = {
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  base_price: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
  sku: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateProductPromotionInput = {
  product_id: Scalars['Int']['input'];
  promotion_id: Scalars['Int']['input'];
};

export type CreateProductVariantInput = {
  attribute_id: Scalars['Int']['input'];
  price_modifier: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
  stock_quantity: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};

export type CreatePromotionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  discount_type: EnumDiscountType;
  end_data: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type CreateReviewInput = {
  comment: Scalars['String']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  status: EnumReviewStatus;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateWishlistInput = {
  product_id?: InputMaybe<Scalars['Int']['input']>;
  product_variant_id?: InputMaybe<Scalars['Int']['input']>;
  user_id: Scalars['Int']['input'];
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
  createAttribute: ProductAttribute;
  createCategory: Category;
  createOrder: Order;
  createOrderItem: OrderItem;
  createProduct: Product;
  createProductCategory: ProductCategory;
  createProductImage: ProductImage;
  createProductPromotion: ProductPromotion;
  createProductVariant: ProductVariant;
  createPromotion: Promotion;
  createReview: Review;
  deleteFromWishlist: Wishlist;
  deleteOrder: Order;
  deleteOrderItem: OrderItem;
  deleteProduct: Product;
  deleteProductCategory: ProductCategory;
  deleteProductImage: ProductImage;
  deleteProductPromotion: ProductPromotion;
  deletePromotion: Promotion;
  deleteReview: Review;
  removeAttribute: ProductAttribute;
  removeCategory: Category;
  removeProductVariant: ProductVariant;
  updateAttribute: ProductAttribute;
  updateCategory: Category;
  updateOrder: Order;
  updateOrderItem: OrderItem;
  updateProduct: Product;
  updateProductCategory: ProductCategory;
  updateProductImage: ProductImage;
  updateProductPromotion: ProductPromotion;
  updateProductVariant: ProductVariant;
  updatePromotion: Promotion;
  updateReview: Review;
  updateWishlist: Wishlist;
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


export type MutationCreateAttributeArgs = {
  createAttributeInput: CreateProductAttributeInput;
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


export type MutationCreateProductCategoryArgs = {
  data: CreateProductCategoryInput;
};


export type MutationCreateProductImageArgs = {
  data: CreateProductImageInput;
};


export type MutationCreateProductPromotionArgs = {
  data: CreateProductPromotionInput;
};


export type MutationCreateProductVariantArgs = {
  createProductVariantInput: CreateProductVariantInput;
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


export type MutationDeleteProductCategoryArgs = {
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


export type MutationRemoveAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductVariantArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAttributeArgs = {
  updateAttributeInput: UpdateProductAttributeInput;
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


export type MutationUpdateProductCategoryArgs = {
  data: UpdateProductCategoryInput;
};


export type MutationUpdateProductImageArgs = {
  data: UpdateProductImageInput;
};


export type MutationUpdateProductPromotionArgs = {
  data: UpdateProductPromotionInput;
};


export type MutationUpdateProductVariantArgs = {
  updateProductVariantInput: UpdateProductVariantInput;
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
  total_price: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Product = {
  __typename?: 'Product';
  admin: Admin;
  admin_id: Scalars['Int']['output'];
  base_price: Scalars['Int']['output'];
  categories: Array<ProductCategory>;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  promotions: Array<ProductPromotion>;
  rating: Scalars['Int']['output'];
  reviews: Array<Review>;
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  variants: Array<ProductVariant>;
  wishlist: Array<Wishlist>;
};

export type ProductAttribute = {
  __typename?: 'ProductAttribute';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  category: Category;
  category_id: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
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
  Wishlist: Array<Wishlist>;
  attribute: ProductAttribute;
  attribute_id: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  order_item: Array<OrderItem>;
  price_modifier: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['Int']['output'];
  stock_quantity: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Promotion = {
  __typename?: 'Promotion';
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  discount_type: EnumDiscountType;
  end_data: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  promotions: Array<ProductPromotion>;
  start_date: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminById: Admin;
  attribute: ProductAttribute;
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
  productCategories: Array<ProductCategory>;
  productCategory: ProductCategory;
  productImage: ProductImage;
  productImages: Array<ProductImage>;
  productPromotion: ProductPromotion;
  productPromotions: Array<ProductPromotion>;
  productVariant: ProductVariant;
  productVariants: Array<ProductVariant>;
  products: Array<Product>;
  promotion: Promotion;
  promotions: Array<Promotion>;
  review: Review;
  reviews: Array<Review>;
  userWishlist: Array<Wishlist>;
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


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductCategoryArgs = {
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


export type QueryPromotionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReviewArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWishlistItemArgs = {
  id: Scalars['Int']['input'];
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

export type UpdateAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
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
  price?: InputMaybe<Scalars['Int']['input']>;
  product_variant_id?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  total_price?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductAttributeInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductCategoryInput = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductImageInput = {
  id: Scalars['Int']['input'];
  is_main?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  base_price?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductPromotionInput = {
  id: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  promotion_id?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductVariantInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  price_modifier?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  stock_quantity?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePromotionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  discount_type?: InputMaybe<EnumDiscountType>;
  end_data?: InputMaybe<Scalars['DateTime']['input']>;
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
  rating: Scalars['Float']['output'];
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


export type AuthAdminNewTokensQuery = { __typename?: 'Query', authAdminNewTokens: { __typename?: 'AuthResponse', refreshToken: string, accessToken: string, user?: { __typename?: 'AuthUser', role: EnumUserRole, id: number, first_name: string, last_name: string, email: string } | null } };

export type OrdersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQueryQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: number, status: string, total_price: number, order_items: Array<{ __typename?: 'OrderItem', id: number, total_price: number, product_variant_id: number }> }> };

export type OrderQueryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OrderQueryQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: number, status: string, total_price: number, order_items: Array<{ __typename?: 'OrderItem', total_price: number, product_variant_id: number }> } };

export const AuthUserFragmentFragmentDoc = gql`
    fragment AuthUserFragment on AuthUser {
  id
  first_name
  last_name
  email
}
    `;
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
      ...AuthUserFragment
    }
    refreshToken
    accessToken
  }
}
    ${AuthUserFragmentFragmentDoc}`;

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
      ...AuthUserFragment
      role
    }
    refreshToken
    accessToken
  }
}
    ${AuthUserFragmentFragmentDoc}`;

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
export const OrdersQueryDocument = gql`
    query OrdersQuery {
  orders {
    id
    status
    total_price
    order_items {
      id
      total_price
      product_variant_id
    }
  }
}
    `;

/**
 * __useOrdersQueryQuery__
 *
 * To run a query within a React component, call `useOrdersQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrdersQueryQuery(baseOptions?: Apollo.QueryHookOptions<OrdersQueryQuery, OrdersQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQueryQuery, OrdersQueryQueryVariables>(OrdersQueryDocument, options);
      }
export function useOrdersQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQueryQuery, OrdersQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQueryQuery, OrdersQueryQueryVariables>(OrdersQueryDocument, options);
        }
export function useOrdersQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrdersQueryQuery, OrdersQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersQueryQuery, OrdersQueryQueryVariables>(OrdersQueryDocument, options);
        }
export type OrdersQueryQueryHookResult = ReturnType<typeof useOrdersQueryQuery>;
export type OrdersQueryLazyQueryHookResult = ReturnType<typeof useOrdersQueryLazyQuery>;
export type OrdersQuerySuspenseQueryHookResult = ReturnType<typeof useOrdersQuerySuspenseQuery>;
export type OrdersQueryQueryResult = Apollo.QueryResult<OrdersQueryQuery, OrdersQueryQueryVariables>;
export const OrderQueryDocument = gql`
    query OrderQuery($id: Int!) {
  order(id: $id) {
    id
    status
    total_price
    order_items {
      total_price
      product_variant_id
    }
  }
}
    `;

/**
 * __useOrderQueryQuery__
 *
 * To run a query within a React component, call `useOrderQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderQueryQuery(baseOptions: Apollo.QueryHookOptions<OrderQueryQuery, OrderQueryQueryVariables> & ({ variables: OrderQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQueryQuery, OrderQueryQueryVariables>(OrderQueryDocument, options);
      }
export function useOrderQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQueryQuery, OrderQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQueryQuery, OrderQueryQueryVariables>(OrderQueryDocument, options);
        }
export function useOrderQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrderQueryQuery, OrderQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderQueryQuery, OrderQueryQueryVariables>(OrderQueryDocument, options);
        }
export type OrderQueryQueryHookResult = ReturnType<typeof useOrderQueryQuery>;
export type OrderQueryLazyQueryHookResult = ReturnType<typeof useOrderQueryLazyQuery>;
export type OrderQuerySuspenseQueryHookResult = ReturnType<typeof useOrderQuerySuspenseQuery>;
export type OrderQueryQueryResult = Apollo.QueryResult<OrderQueryQuery, OrderQueryQueryVariables>;