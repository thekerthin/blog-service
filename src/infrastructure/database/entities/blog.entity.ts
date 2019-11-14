import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
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

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(type => User, user => user.blogs)
  owner: User;

  @Column({ type: 'bool', default: false, name: 'is_public' })
  isPublic: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
