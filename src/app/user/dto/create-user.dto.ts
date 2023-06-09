import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  city: number;

  @IsNumber()
  @IsNotEmpty()
  uf: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsStrongPassword()
  @IsNotEmpty()
  passwordConfirmad: string;

  @IsNumberString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  addressNumber: number;
}
