import { City } from 'src/app/city/entities/city.entity';
import { UF } from 'src/app/uf/entities/uf.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({})
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ManyToOne((type) => City)
  city: City;

  @ManyToOne((type) => UF)
  uf: UF;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 9, nullable: false })
  cep: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'int', nullable: true })
  addressNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
