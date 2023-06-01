import { PartialType } from '@nestjs/mapped-types';
import { CreateUfDto } from './create-uf.dto';

export class UpdateUfDto extends PartialType(CreateUfDto) {}
