import { IsString, MinLength } from 'class-validator';

export class CreateSportDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  description: string;
  @IsString()
  @MinLength(1)
  history: string;
}
