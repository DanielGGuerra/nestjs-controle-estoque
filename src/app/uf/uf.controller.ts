import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UfService } from './uf.service';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';

@Controller('uf')
export class UfController {
  constructor(private readonly ufService: UfService) {}

  @Post()
  create(@Body() createUfDto: CreateUfDto) {
    return this.ufService.create(createUfDto);
  }

  @Get()
  findAll() {
    return this.ufService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ufService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUfDto: UpdateUfDto) {
    return this.ufService.update(+id, updateUfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ufService.remove(+id);
  }
}
