import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Borrows } from './Borrows';

@Index('users_email_key', ['email'], { unique: true })
@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('date', {
    name: 'registered_date',
    nullable: true,
    default: () => 'CURRENT_DATE',
  })
  registeredDate: string | null;

  @OneToMany(() => Borrows, (borrows) => borrows.user)
  borrows: Borrows[];
}
