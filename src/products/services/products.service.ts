import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  private counterId = 1;

  async findAll() {
    return await this.productRepository.find({ relations: ['brand'] });
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
    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      product.brand = brand;
    }
    return await this.productRepository.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      product.brand = brand;
    }
    this.productRepository.merge(product, changes);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
