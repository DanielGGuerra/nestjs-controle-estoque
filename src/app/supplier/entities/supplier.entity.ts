import { City } from 'src/app/city/entities/city.entity';
import { Entry } from 'src/app/item/entities/entry.entity';
import { UF } from 'src/app/uf/entities/uf.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @ManyToOne(() => UF, (uf) => uf.supplier)
  uf: UF | number;

  @ManyToOne(() => City, (city) => city.supplier)
  city: City | number;

  @Column({ type: 'varchar', length: 14, nullable: false, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  ie: string;

  @Column({ type: 'varchar', length: 8, nullable: false })
  cep: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'int', nullable: false })
  addressNumber: number;

  @OneToMany(() => Entry, (entry) => entry.supplier)
  suppliers: Supplier[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
