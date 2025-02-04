/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookSearchDto {
  @ApiProperty({ required: false, description: 'Filter books by title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, description: 'Filter books by author name' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ required: false, description: 'Filter books by genre' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    required: false,
    description: 'Filter books by minimum rating',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;
}
