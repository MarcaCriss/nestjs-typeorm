import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);
    return await this.categoryRepository.save(category);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepository.merge(category, changes);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
