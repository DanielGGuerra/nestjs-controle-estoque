import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { TypeItem } from './entities/type.entity';
import { CreateTypeItemDto } from './dtos/create-type-item.dto';
import { UpdateTypeItemDto } from './dtos/update-type-item.dto';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './entities/item.entity';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Filter } from './interface/filter.interface';
import { CreateEntryDto } from './dtos/create-entry.dto';
import { Entry } from './entities/entry.entity';
import { UpdateEntryDto } from './dtos/update-entry.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() itemDto: CreateItemDto): Promise<Item> {
    return await this.itemService.create(itemDto);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: number): Promise<Item> {
    return await this.itemService.find(id);
  }

  @Get('filter')
  async findByDescription(@Query() filter: Filter): Promise<Item[]> {
    return await this.itemService.findByDescription(filter);
  }

  @Patch('id/:id')
  async update(
    @Param('id') id: number,
    @Body() itemDto: UpdateItemDto,
  ): Promise<void> {
    await this.itemService.update(id, itemDto);
  }

  @Delete('id/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.itemService.delete(id);
  }

  @Post('type-item')
  async createTypeItem(
    @Body() typeItemDto: CreateTypeItemDto,
  ): Promise<TypeItem> {
    return await this.itemService.createTypeItem(typeItemDto);
  }

  @Get('type-item')
  async findTypeItemAll(): Promise<TypeItem[]> {
    return await this.itemService.findTypeItemAll();
  }

  @Get('type-item/:id')
  async findTypeItem(@Param('id') id: number): Promise<TypeItem> {
    return await this.itemService.findTypeItem(id);
  }

  @Patch('type-item/:id')
  async updateTypeItem(
    @Param('id') id: number,
    @Body() typeItemDto: UpdateTypeItemDto,
  ): Promise<void> {
    await this.itemService.updateTypeItem(id, typeItemDto);
  }

  @Delete('type-item/:id')
  async deleteTypeItem(@Param('id') id: number): Promise<void> {
    await this.itemService.deleteTypeItem(id);
  }

  @Post('entry')
  async entryItem(@Body() entryDto: CreateEntryDto, @Req() request) {
    return await this.itemService.entryItem(request.user.sub, entryDto);
  }

  @Post('entry/finish/:id')
  async entryFinish(@Param('id') id: number) {
    await this.itemService.setFinishEntry(id);
  }

  @Get('entry')
  async entryItemFind(): Promise<Entry[]> {
    return await this.itemService.entryItemFind();
  }

  @Get('entry/:id')
  async entryItemFindById(@Param('id') id: number): Promise<Entry> {
    return await this.itemService.entryItemFindById(id);
  }

  @Patch('entry/:id')
  async updateEntryItem(
    @Param('id') id: number,
    @Body() entryDto: UpdateEntryDto,
  ): Promise<void> {
    await this.itemService.updateEntry(id, entryDto);
  }

  @Delete('entry/:id')
  async deleteEntry(@Param('id') id: number): Promise<void> {
    await this.itemService.deleteEntry(id);
  }
}
