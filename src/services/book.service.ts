import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from '../entities/entities/Books';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Books)
    private readonly bookRepository: Repository<Books>,
  ) {}

  async searchBooks(params: {
    title?: string;
    author?: string;
    genre?: string;
    rating?: number;
  }): Promise<Books[]> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (params.title) {
      queryBuilder.andWhere('LOWER(book.title) LIKE LOWER(:title)', {
        title: `%${params.title}%`,
      });
    }

    if (params.author) {
      queryBuilder.andWhere('LOWER(book.author) LIKE LOWER(:author)', {
        author: `%${params.author}%`,
      });
    }

    if (params.genre) {
      queryBuilder.andWhere('LOWER(book.genre) LIKE LOWER(:genre)', {
        genre: `%${params.genre}%`,
      });
    }

    if (params.rating) {
      queryBuilder.andWhere('book.rating >= :rating', {
        rating: params.rating,
      });
    }

    return queryBuilder.getMany();
  }
}
