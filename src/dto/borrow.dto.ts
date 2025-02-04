/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowBookDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'Book ID', example: 1 })
  @IsInt()
  @IsPositive()
  bookId: number;
}

export class ReturnBookDto {
  @ApiProperty({ description: 'Book ID', example: 1 })
  @IsInt()
  @IsPositive()
  bookId: number;
}

export class GetUserBorrowsDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  @IsPositive()
  userId: number;
}
