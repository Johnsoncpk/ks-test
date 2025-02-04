import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { BookSearchDto } from '../dto/book.dto';
import { Books } from '../entities/entities/Books';
import { BorrowService } from '../services/borrow.service';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';
import { Borrows } from '../entities/entities/Borrows';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly borrowService: BorrowService,
  ) {}

  @ApiOperation({
    summary: 'Search books',
    description:
      'Search books using optional filters for title, author, genre, and rating',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of books matching the search criteria',
    type: [Books],
  })
  @Get('search')
  async searchBooks(@Query() searchParams: BookSearchDto): Promise<Books[]> {
    return this.bookService.searchBooks(searchParams);
  }

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto): Promise<Borrows> {
    return this.borrowService.borrowBook(borrowBookDto);
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto): Promise<Borrows> {
    return this.borrowService.returnBook(returnBookDto);
  }
}
