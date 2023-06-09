import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeItem } from './type.entity';
import { EntryItem } from './entry-item.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => TypeItem, (typeItem) => typeItem.items, { nullable: false })
  typeItem: TypeItem | number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false, default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 2 })
  unitaryValue: unitaryValue;

  @OneToMany(() => EntryItem, (entryItem) => entryItem.item)
  entryItem: EntryItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

export enum unitaryValue {
  UN = 'UN',
  GR = 'GR',
  KG = 'KG',
  TO = 'TO',
}
