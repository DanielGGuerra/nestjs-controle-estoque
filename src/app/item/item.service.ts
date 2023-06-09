import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from './entities/item.entity';
import { TypeItem } from './entities/type.entity';
import { CreateTypeItemDto } from './dtos/create-type-item.dto';
import { UpdateTypeItemDto } from './dtos/update-type-item.dto';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { ItemRepository } from './repositories/item.repository';
import { Filter } from './interface/filter.interface';
import { CreateEntryDto } from './dtos/create-entry.dto';
import { Entry } from './entities/entry.entity';
import { User } from '../user/entities/user.entity';
import { UpdateEntryDto } from './dtos/update-entry.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async create(itemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.saveItem(itemDto);
  }

  async find(id: number): Promise<Item> {
    const item = await this.itemRepository.findItem(id);

    if (!item) {
      throw new NotFoundException(`Item ${id} not found`);
    }

    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.findAllItem();
  }

  async findByDescription(filter: Filter): Promise<Item[]> {
    return await this.itemRepository.findByFilter(filter);
  }

  async update(id: number, itemDto: UpdateItemDto): Promise<void> {
    await this.itemRepository.updateItem(id, itemDto);
  }

  async delete(id: number): Promise<void> {
    await this.itemRepository.deleteItem(id);
  }

  async createTypeItem(typeItemDto: CreateTypeItemDto): Promise<TypeItem> {
    return await this.itemRepository.saveTypeItem(typeItemDto);
  }

  async findAllTypeItem(): Promise<TypeItem[]> {
    return await this.itemRepository.findAllTypeItem();
  }

  async findTypeItem(id: number): Promise<TypeItem> {
    const typeItem = await this.itemRepository.findTypeItem(id);
    if (!typeItem) throw new NotFoundException(`TypeItem ${id} not found`);
    return typeItem;
  }

  async findTypeItemAll(): Promise<TypeItem[]> {
    return await this.itemRepository.findByFilterTypeItem();
  }

  async updateTypeItem(
    id: number,
    typeItemDto: UpdateTypeItemDto,
  ): Promise<void> {
    await this.findTypeItem(id);
    await this.itemRepository.updateTypeItem(id, typeItemDto);
  }

  async deleteTypeItem(id: number): Promise<void> {
    await this.findTypeItem(id);
    await this.itemRepository.deleteTypeItem(id);
  }

  async entryItem(userId: number, entryDto: CreateEntryDto): Promise<void> {
    entryDto.entryItems.forEach((item) => {
      if (item.quanty <= 0)
        throw new BadRequestException(`Invalid quantity in item ${item.item}`);
    });
    await this.itemRepository.entryItem(userId, entryDto);
  }

  async entryItemFind(): Promise<Entry[]> {
    const entry = await this.itemRepository.entryItemFind();

    if (entry.length) {
      return entry.map(({ user, ...entry }) => {
        user = user as User;

        user.password = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        user.deletedAt = undefined;

        return { ...entry, user };
      });
    }

    return [];
  }

  async entryItemFindById(id: number): Promise<Entry> {
    const entry = await this.itemRepository.entryItemFindById(id);

    if (entry) {
      entry.user = entry.user as User;

      entry.user.password = undefined;
      entry.user.createdAt = undefined;
      entry.user.updatedAt = undefined;
      entry.user.deletedAt = undefined;

      return entry;
    }

    throw new NotFoundException(`Entry ${id} not found`);
  }

  async deleteEntry(id: number): Promise<void> {
    const entry = await this.entryItemFindById(id);

    if (entry.isFinish) {
      throw new BadRequestException(
        `it is not allowed to remove finished entry`,
      );
    }

    await this.itemRepository.entryDelete(id);
  }

  async setFinishEntry(id: number): Promise<void> {
    const { isFinish } = await this.entryItemFindById(id);

    if (isFinish) throw new BadRequestException(`Entry is Finish`);

    await this.itemRepository.entrySetFinish(id);
  }

  async updateEntry(id: number, updateEntry: UpdateEntryDto): Promise<void> {
    await this.itemRepository.updateEntryItem(id, updateEntry);
  }
}
