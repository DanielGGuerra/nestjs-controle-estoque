import { Module } from '@nestjs/common';
import { UfService } from './uf.service';
import { UfController } from './uf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UF } from './entities/uf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UF])],
  controllers: [UfController],
  providers: [UfService],
})
export class UfModule {}
