import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private counterId = 1;

  async findAll() {
    return await this.productRepository.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['categories', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Producto #${id} no se encontro`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandRepository.findOne(data.brandId);
      product.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findByIds(
        data.categoriesIds,
      );
      product.categories = categories;
    }
    return await this.productRepository.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepository.findOne(changes.brandId);
      product.brand = brand;
    }
    this.productRepository.merge(product, changes);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
