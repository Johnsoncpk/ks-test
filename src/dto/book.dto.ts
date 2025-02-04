/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class BookSearchDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;
}
