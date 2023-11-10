import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { AuthAdmin } from "../auth/decorators/auth-admin.decorators";
import { CurrentAdmin } from "../auth/decorators/current-admin.decorators";

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  @AuthAdmin()
  productCreate(
    @CurrentAdmin("id") id: number,
    @Args("createProductInput") createProductInput: CreateProductInput
  ) {
    return this.productService.create(id, createProductInput);
  }

  @Query(() => [Product])
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  findOne(@Args("id") id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  @AuthAdmin()
  productUpdate(
    @CurrentAdmin("id") id: number,
    @Args("updateProductInput") updateProductInput: UpdateProductInput
  ) {
    const productId = updateProductInput.id;
    delete updateProductInput.id;
    return this.productService.update(productId, updateProductInput);
  }

  @Mutation(() => Product)
  @AuthAdmin()
  productRemove(@Args("id") id: number) {
    return this.productService.remove(id);
  }
}
