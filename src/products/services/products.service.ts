import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  private counterId = 1;

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto #${id} no se encontro`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, changes);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
