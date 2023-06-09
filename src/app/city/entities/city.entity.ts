import { Supplier } from 'src/app/supplier/entities/supplier.entity';
import { UF } from 'src/app/uf/entities/uf.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne((type) => UF, { cascade: true })
  uf: UF | number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @OneToMany(() => Supplier, (supplier) => supplier.uf)
  supplier: Supplier[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
