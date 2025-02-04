import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Books } from './Books';
import { Users } from './Users';

@Index('borrows_pkey', ['id'], { unique: true })
@Entity('borrows', { schema: 'public' })
export class Borrows {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('date', {
    name: 'borrow_date',
    nullable: true,
    default: () => 'CURRENT_DATE',
  })
  borrowDate: string | null;

  @Column('date', { name: 'return_date', nullable: true })
  returnDate: string | null;

  @ManyToOne(() => Books, (books) => books.borrows, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'book_id', referencedColumnName: 'id' }])
  book: Books;

  @ManyToOne(() => Users, (users) => users.borrows, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
