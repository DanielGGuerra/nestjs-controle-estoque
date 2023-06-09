import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEntryItemDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  item: number;

  @IsNotEmpty()
  @IsNumber()
  quanty: number;

  @IsOptional()
  @IsBoolean()
  delete: boolean;
}
