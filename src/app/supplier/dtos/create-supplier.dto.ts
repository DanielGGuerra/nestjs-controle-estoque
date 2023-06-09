import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  uf: number;

  @IsNumber()
  @IsNotEmpty()
  city: number;

  @MinLength(14)
  @MaxLength(14)
  cnpj: string;

  @IsOptional()
  @IsString()
  ie: string;

  @MinLength(8)
  @MaxLength(8)
  cep: string;

  @MinLength(3)
  @MaxLength(100)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  addressNumber: number;
}
