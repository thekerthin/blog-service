import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('blogs')
export class Blog {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 350, nullable: true })
  description?: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 36, name: 'owner_id' })
  ownerId: string;

  @Column({ type: 'bool', default: false, name: 'is_public' })
  isPublic: boolean;

  @ManyToOne(type => User, user => user.blogs)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
