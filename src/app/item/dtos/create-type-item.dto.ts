import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTypeItemDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;
}
