import {
  IsNumber,
  IsNumberString,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  city: number;

  @IsNumber()
  uf: number;

  @IsString()
  email: string;

  @IsNumberString()
  phoneNumber: string;

  @IsStrongPassword()
  password: string;

  @IsStrongPassword()
  passwordConfirmad: string;

  @IsNumberString()
  cep: string;

  @IsString()
  address: string;

  @IsNumber()
  addressNumber: number;
}
