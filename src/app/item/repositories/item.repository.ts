import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { TypeItem } from '../entities/type.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { CreateTypeItemDto } from '../dtos/create-type-item.dto';
import { UpdateTypeItemDto } from '../dtos/update-type-item.dto';
import { Filter } from '../interface/filter.interface';
import { CreateEntryDto } from '../dtos/create-entry.dto';
import { Entry } from '../entities/entry.entity';
import { EntryItem } from '../entities/entry-item.entity';
import { UpdateEntryDto } from '../dtos/update-entry.dto';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(TypeItem)
    private readonly typeItemRepository: Repository<TypeItem>,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    @InjectRepository(EntryItem)
    private readonly entryItemRepository: Repository<EntryItem>,
    private readonly dataSource: DataSource,
  ) {}

  async saveItem(item: Partial<Item>): Promise<Item> {
    return await this.itemRepository.save(item);
  }

  async findItem(id: number): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id } });
  }

  async findAllItem(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findByFilter(filter: Filter): Promise<Item[]> {
    return await this.itemRepository.find({
      where: {
        description: Like(filter.description),
      },
    });
  }

  async updateItem(id: number, itemDto: UpdateItemDto): Promise<void> {
    await this.itemRepository.update({ id }, itemDto);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete({ id });
  }

  async saveTypeItem(typeItemDto: CreateTypeItemDto): Promise<TypeItem> {
    return await this.typeItemRepository.save(typeItemDto);
  }

  async findAllTypeItem(): Promise<TypeItem[]> {
    return await this.typeItemRepository.find();
  }

  async findTypeItem(id: number): Promise<TypeItem> {
    return await this.typeItemRepository.findOne({ where: { id } });
  }

  async findByFilterTypeItem(): Promise<TypeItem[]> {
    return await this.typeItemRepository.find();
  }

  async updateTypeItem(
    id: number,
    typeItemDto: UpdateTypeItemDto,
  ): Promise<void> {
    await this.typeItemRepository.update({ id }, typeItemDto);
  }

  async deleteTypeItem(id: number): Promise<void> {
    await this.typeItemRepository.delete({ id });
  }

  async entryItem(userId: number, entryDto: CreateEntryDto): Promise<void> {
    const { entryItems, ...params } = entryDto;
    await this.dataSource.transaction(async (transaction) => {
      const entry = await transaction
        .insert<Entry>(Entry, {
          user: userId,
          ...params,
        })
        .then((result) => result.generatedMaps[0]);

      for (const item of entryItems) {
        await transaction.insert<EntryItem>(EntryItem, {
          ...item,
          entry: entry.id,
        });
        if (params.isFinish) {
          const { balance } = await this.findItem(item.item);

          const newBalance = balance + item.quanty;

          await transaction.update<Item>(
            Item,
            { id: item.item },
            { balance: newBalance },
          );
        }
      }
    });
  }

  async updateEntryItem(id: number, entryDto: UpdateEntryDto): Promise<void> {
    const { entryItems, ...params } = entryDto;
    await this.dataSource.transaction(async (transaction) => {
      await transaction.update<Entry>(Entry, { id }, params);

      for (const item of entryItems) {
        if (item.id && item.delete) {
          await transaction.delete(EntryItem, { id: item.id });
          continue;
        } else if (item.id) {
          await transaction.update(EntryItem, { id: item.id }, item);
        } else {
          await transaction.insert(EntryItem, {
            ...item,
            entry: id,
          });
        }

        if (params.isFinish) {
          const { balance } = await this.findItem(item.item);

          const newBalance = balance + item.quanty;

          await transaction.update<Item>(
            Item,
            { id: item.item },
            { balance: newBalance },
          );
        }
      }
    });
  }

  async entryItemFind(): Promise<Entry[]> {
    return await this.entryRepository.find({
      relations: {
        user: true,
        entryItems: {
          item: true,
        },
      },
    });
  }

  async entryItemFindById(id: number): Promise<Entry> {
    return await this.entryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        entryItems: {
          item: true,
        },
      },
    });
  }

  async entryDelete(id: number): Promise<void> {
    await this.entryRepository.delete({ id });
  }

  async entrySetFinish(id: number): Promise<void> {
    await this.dataSource.transaction(async (transaction) => {
      await transaction.update<Entry>(Entry, { id }, { isFinish: true });
      const items = await transaction.find<EntryItem>(EntryItem, {
        where: {
          entry: {
            id,
          },
        },
      });

      for (const item of items) {
        const { balance } = await this.findItem(item.item as number);
        await transaction.update(
          Item,
          { id: item.item },
          { balance: item.quanty + balance },
        );
      }
    });
  }
}
