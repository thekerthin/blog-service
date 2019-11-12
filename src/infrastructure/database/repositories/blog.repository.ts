import { EntityRepository, Repository } from 'typeorm';

import { Blog } from '../entities/blog.entity';

@EntityRepository(Blog)
export default class BlogRepository extends Repository<Blog> { }
