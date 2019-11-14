import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Blog } from './blog.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  names: string;

  @Column({ length: 100 })
  surnames: string;

  @Column({ length: 50, unique: true })
  nickname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @OneToMany(type => Blog, blog => blog.owner)
  blogs: Blog[];

}
