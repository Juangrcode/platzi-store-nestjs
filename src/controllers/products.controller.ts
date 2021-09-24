import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';

import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';

@Controller('products') // 👈 Route
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return { message: `yo soy un filter` };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  // getProduct(@Res() response: Response, @Param('productId') productId: string) {
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // response.status(200).send({ message: `product ${productId}` });
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'action of create',
    //   payload,
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    // return id;
    return this.productService.delete(id);
  }
}
