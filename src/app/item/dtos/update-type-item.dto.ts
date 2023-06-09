import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeItemDto } from './create-type-item.dto';

export class UpdateTypeItemDto extends PartialType(CreateTypeItemDto) {}
