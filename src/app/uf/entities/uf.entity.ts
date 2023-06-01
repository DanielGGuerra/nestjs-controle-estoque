import { City } from 'src/app/city/entities/city.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
export class UF {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: '50', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '2', nullable: false, unique: true })
  @Index()
  acronym: string;

  @OneToMany((type) => City, (city) => city.uf)
  cities: City[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  private updateCaseAcronym() {
    this.acronym = this.acronym.toUpperCase();
  }
}
