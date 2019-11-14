import { Injectable } from '@nestjs/common';
import { EmitEvent, EventBus } from '@kerthin/cqrs';
import * as R from 'ramda';
import { toPaginatedResult, PaginationResult, isEmptyOrNil, ElementNotFoundError } from '@kerthin/utils';
import BlogRepository from '@infrastructure/database/repositories/blog.repository';
import { BlogDomainEntity } from '@domain/entities/blog-domain.entity';

const wrapOwner = R.evolve({ owner: R.objOf('id') });

@Injectable()
export default class BlogDomainService {

  constructor(
    private readonly repository: BlogRepository,
    private readonly eventBus: EventBus
  ) { }

  @EmitEvent({ context: 'blog', action: 'blogCreated' })
  async create(data: BlogDomainEntity): Promise<BlogDomainEntity> {
    const blog = this.repository.create(wrapOwner(data));

    return this.repository.save(blog) as unknown as BlogDomainEntity;
  }

  @EmitEvent({ context: 'blog', action: 'blogUpdated' })
  async update(data: BlogDomainEntity): Promise<BlogDomainEntity | unknown> {
    const blog = await this.repository.findOne({ id: data.id });

    if (isEmptyOrNil(blog)) {
      throw new ElementNotFoundError(`The blog with id '${data.id}' doesn't exists.`);
    }

    return this.repository.save({ ...blog, ...wrapOwner(data) });
  }

  @EmitEvent({ context: 'blog', action: 'blogDeleted' })
  async remove(id: string): Promise<void> {
    const blog = await this.repository.findOne({ id });

    if (isEmptyOrNil(blog)) {
      throw new ElementNotFoundError(`The blog with id '${id}' doesn't exists.`);
    }

    await this.repository.remove(blog);
  }

  findAll(options): Promise<PaginationResult<BlogDomainEntity>> {
    return this.repository.findAndCountCustom()
      .then(toPaginatedResult(options));
  }

  findOneById(id: string): Promise<BlogDomainEntity | unknown> {
    return this.repository.findOne({ id });
  }

}
