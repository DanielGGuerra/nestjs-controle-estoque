import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { TypeItem } from './entities/type.entity';
import { Entry } from './entities/entry.entity';
import { ItemRepository } from './repositories/item.repository';
import { EntryItem } from './entities/entry-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, TypeItem, Entry, EntryItem])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
