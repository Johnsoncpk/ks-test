import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BookSearchDto } from '../dto/book.dto';
import { Books } from '../entities/entities/Books';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('search')
  async searchBooks(@Query() searchParams: BookSearchDto): Promise<Books[]> {
    return this.bookService.searchBooks(searchParams);
  }
}
