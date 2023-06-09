import { Supplier } from 'src/app/supplier/entities/supplier.entity';
import { User } from 'src/app/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntryItem } from './entry-item.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.suppliers)
  supplier: Supplier | number;

  @ManyToOne(() => User, (user) => user.entry)
  user: User | number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  observation: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: new Date().toISOString(),
  })
  date: Date;

  @OneToMany(() => EntryItem, (item) => item.entry)
  entryItems: EntryItem[];

  @Column({ type: 'boolean', nullable: false, default: false })
  isFinish: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
