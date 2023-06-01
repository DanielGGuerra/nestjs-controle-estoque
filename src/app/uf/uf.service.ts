import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UF } from './entities/uf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UfService {
  constructor(
    @InjectRepository(UF) private readonly ufRepository: Repository<UF>,
  ) {}

  async create(createUfDto: CreateUfDto): Promise<UF> {
    const isExist = await this.findByAcronym(createUfDto.acronym).catch(
      () => undefined,
    );
    if (isExist)
      throw new BadRequestException(`UF ${createUfDto.acronym} already exist.`);
    return await this.ufRepository.save(createUfDto);
  }

  async findAll(): Promise<UF[]> {
    return await this.ufRepository.find();
  }

  async findOne(id: number): Promise<UF> {
    const uf = await this.ufRepository.findOne({ where: { id } });
    if (!uf) throw new NotFoundException(`UF ${id} not found.`);
    return uf;
  }

  async findByAcronym(acronym: string): Promise<UF> {
    const uf = await this.ufRepository.findOne({ where: { acronym } });
    if (!uf) throw new NotFoundException(`UF ${acronym} not found.`);
    return uf;
  }

  async update(id: number, updateUfDto: UpdateUfDto): Promise<void> {
    await this.findOne(id);
    await this.ufRepository.update({ id }, updateUfDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.ufRepository.delete({ id });
  }
}
