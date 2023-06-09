import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { IQuery } from './interfaces/filter.interface';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  async create(@Body() supplierDto: CreateSupplierDto): Promise<Supplier> {
    return await this.supplierService.create(supplierDto);
  }

  @Get()
  async findAll(): Promise<Supplier[]> {
    return await this.supplierService.findAll();
  }

  @Get('id/:id')
  async find(@Param('id') id: number): Promise<Supplier> {
    return await this.supplierService.find(id);
  }

  @Get('search')
  async findByQuery(@Query() filter: IQuery): Promise<Supplier[]> {
    return await this.supplierService.findByQuery(filter);
  }

  @Patch('id/:id')
  async update(
    @Param('id') id: number,
    @Body() supplierDto: UpdateSupplierDto,
  ): Promise<void> {
    await this.supplierService.update(id, supplierDto);
  }

  @Delete('id/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.supplierService.delete(id);
  }
}
