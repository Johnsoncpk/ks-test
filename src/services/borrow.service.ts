import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Borrows } from '../entities/entities/Borrows';
import { Users } from '../entities/entities/Users';
import { Books } from '../entities/entities/Books';
import {
  BorrowBookDto,
  GetUserBorrowsDto,
  ReturnBookDto,
} from 'src/dto/borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Books)
    private readonly booksRepository: Repository<Books>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Borrows)
    private readonly borrowRepository: Repository<Borrows>,
  ) {}

  async borrowBook(createBorrowDto: BorrowBookDto): Promise<Borrows> {
    const { userId, bookId } = createBorrowDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Check if book is already borrowed
    if (book.isAvailable === false) {
      throw new BadRequestException(
        `Book with ID ${bookId} is already borrowed`,
      );
    }

    const borrowDate = new Date().toISOString();

    const borrow = this.borrowRepository.create({
      ...createBorrowDto,
      borrowDate: borrowDate,
      returnDate: null,
    });

    book.isAvailable = false;
    await this.booksRepository.save(book);

    return this.borrowRepository.save(borrow);
  }

  async returnBook(returnBookDto: ReturnBookDto): Promise<Borrows> {
    const { bookId } = returnBookDto;

    // Validate book exists
    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Validate book is currently borrowed
    const borrow = await this.borrowRepository.findOne({
      where: {
        book: { id: bookId },
        returnDate: IsNull(),
      },
      relations: ['book', 'user'],
      order: { borrowDate: 'DESC' },
    });

    if (!borrow) {
      throw new Error(`Book with ID ${bookId} is not currently borrowed`);
    }

    book.isAvailable = true;
    await this.booksRepository.save(book);

    borrow.returnDate = new Date().toISOString();
    return this.borrowRepository.save(borrow);
  }

  async getBorrowsByUserId(
    getUserBorrowsDto: GetUserBorrowsDto,
  ): Promise<Borrows[]> {
    const { userId } = getUserBorrowsDto;

    // Validate user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Fetch all borrow records for the user with related book information
    const borrows = await this.borrowRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['book', 'user'],
      order: { borrowDate: 'DESC' },
    });

    return borrows;
  }
}
