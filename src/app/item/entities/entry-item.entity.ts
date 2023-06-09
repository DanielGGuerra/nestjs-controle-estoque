import { Item } from 'src/app/item/entities/item.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entry } from './entry.entity';

@Entity()
export class EntryItem {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Item, (item) => item.entryItem, { cascade: true })
  item: Item | number;

  @Column({ type: 'decimal', nullable: false })
  quanty: number;

  @ManyToOne(() => Entry, (entry) => entry.entryItems, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  entry: Entry | number;
}
