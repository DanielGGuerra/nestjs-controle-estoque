import {
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateEntryItemDto } from './create-entry-item.dto';
import { Type } from 'class-transformer';

export class CreateEntryDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  supplier: number;

  @IsOptional()
  @IsString()
  observation: string;

  @IsOptional()
  @IsDateString()
  date: Date;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateEntryItemDto)
  @ArrayMinSize(1)
  entryItems: CreateEntryItemDto[];

  @IsOptional()
  @IsBoolean()
  isFinish: boolean;
}
