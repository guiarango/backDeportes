import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  fields: string;
}
