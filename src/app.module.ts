import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './entities/entities/Books';
import { Users } from './entities/entities/Users';
import { Borrows } from './entities/entities/Borrows';
import { BookController } from './controllers/book.controller';
import { UserController } from './controllers/user.controller';
import { BorrowService } from './services/borrow.service';
import { BookService } from './services/book.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ks_lab',
      password: '',
      entities: [Books, Users, Borrows],
      database: 'ks_lab',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Books, Users, Borrows]),
  ],
  controllers: [BookController, UserController],
  providers: [BorrowService, BookService],
})
export class AppModule {}
