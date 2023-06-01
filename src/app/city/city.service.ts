import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Like, Repository } from 'typeorm';
import { CreateCityDto } from './dtos/create-city.dto';
import { UpdateCityDto } from './dtos/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.cityRepository.save(createCityDto);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find({ relations: ['uf'] });
  }

  async findAllByUF(uf: string): Promise<City[]> {
    return await this.cityRepository.find({
      where: {
        uf: {
          acronym: uf,
        },
      },
      relations: ['uf'],
    });
  }

  async findByName(name: string): Promise<City[]> {
    return await this.cityRepository.find({ where: { name: Like(name) } });
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) throw new NotFoundException(`City ${id} not found.`);
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<void> {
    await this.findOne(id);
    await this.cityRepository.update({ id }, updateCityDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.cityRepository.delete({ id });
  }
}
