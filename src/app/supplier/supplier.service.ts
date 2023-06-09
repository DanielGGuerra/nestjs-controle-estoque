import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';
import { IQuery } from './interfaces/filter.interface';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(supplierDto: CreateSupplierDto): Promise<Supplier> {
    return await this.supplierRepository.save(supplierDto);
  }

  async find(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });

    if (!supplier) {
      throw new NotFoundException(`Supplier ${id} not found`);
    }

    return supplier;
  }

  async findAll(): Promise<Supplier[]> {
    return await this.supplierRepository.find();
  }

  async findByQuery(filter: IQuery): Promise<Supplier[]> {
    const find: FindOptionsWhere<Supplier> = {};

    if (filter.name) {
      find.name = Like(filter.name);
    }

    if (filter.cnpj) {
      find.cnpj = Like(filter.cnpj);
    }

    return await this.supplierRepository.find({
      where: find,
    });
  }

  async update(id: number, supplierDto: UpdateSupplierDto): Promise<void> {
    await this.find(id);
    await this.supplierRepository.update({ id }, supplierDto);
  }

  async delete(id: number): Promise<void> {
    await this.find(id);
    await this.supplierRepository.delete({ id });
  }
}
