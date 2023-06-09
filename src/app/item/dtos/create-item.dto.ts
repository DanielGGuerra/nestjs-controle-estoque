import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { unitaryValue } from '../entities/item.entity';

export class CreateItemDto {
  @IsNumber()
  @IsNotEmpty()
  typeItem: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @IsEnum(unitaryValue)
  unitaryValue: unitaryValue;
}
