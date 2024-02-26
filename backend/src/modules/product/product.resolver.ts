import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { AuthAdmin } from "../auth/decorators/auth-admin.decorators";
import { CurrentAdmin } from "../auth/decorators/current-admin.decorators";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  @UsePipes(CustomValidationPipe)
  @AuthAdmin()
  productCreate(
    @CurrentAdmin("id") id: number,
    @Args("createProductInput") createProductInput: CreateProductInput
  ) {
    return this.productService.create(id, createProductInput);
  }

  @Mutation(() => Product)
  @UsePipes(CustomValidationPipe)
  @AuthAdmin()
  productUpdate(
    @CurrentAdmin("id") id: number,
    @Args("updateProductInput") updateProductInput: UpdateProductInput
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  @AuthAdmin()
  productRemove(@Args("id") id: number) {
    return this.productService.remove(id);
  }

  @Query(() => [Product])
  productBySearch(@Args("pattern") pattern: string) {
    return this.productService.findManyBySearch(pattern);
  }

  @Query(() => Product)
  productGetByID(@Args("id") id: number) {
    return this.productService.getByID(id);
  }

  @Query(() => [Product])
  productGetMany(@Args("skip") skip: number, @Args("take") take: number) {
    return this.productService.getMany(skip, take);
  }

  @Query(() => Int)
  async productCount() {
    return this.productService.getCount();
  }

  @Query(() => Product)
  async productSetMainImage(
    @Args("product_id") product_id: number,
    @Args("image_id") image_id: number
  ) {
    return this.productService.setMainImage(product_id, image_id);
  }
}
