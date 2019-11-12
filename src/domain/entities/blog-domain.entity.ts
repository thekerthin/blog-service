export class BlogDomainEntity {
  id: string;
  title: string;
  description?: string;
  content: string;
  ownerId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}
