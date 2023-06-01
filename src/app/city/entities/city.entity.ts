import { UF } from 'src/app/uf/entities/uf.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
