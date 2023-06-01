import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUfDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  acronym: string;
}
