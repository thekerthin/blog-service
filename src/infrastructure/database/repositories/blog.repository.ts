import { EntityRepository, Repository, FindManyOptions } from 'typeorm';

import { Blog } from '../entities/blog.entity';

@EntityRepository(Blog)
export default class BlogRepository extends Repository<Blog> {

  async findAndCountCustom(options?: FindManyOptions<Blog>): Promise<[Blog[], number]> {
    const count = await this.count();
    const blogs = await this.createQueryBuilder('blog')
      .addSelect('owner')
      .leftJoin('blog.owner', 'owner')
      .getMany();

    return [blogs, count];
  }

}
