import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const brand = this.brandRepository.create(data);
    return await this.brandRepository.save(brand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepository.merge(brand, changes);
    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    return await this.brandRepository.delete(id);
  }
}
