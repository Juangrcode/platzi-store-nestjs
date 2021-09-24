import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products || [];
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
      // throw new HttpException('Error no se encontro', HttpStatus.BAD_REQUEST);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(payload: UpdateProductDto, id: number) {
    const product = this.findOne(id);

    if (product) {
      const index: any = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }

    return null;
  }

  delete(id: number) {
    const product = this.findOne(id);
    const productIndex = this.products.indexOf(product);
    this.products.splice(productIndex, 1);

    return product;
  }
}
