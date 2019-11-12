import { Injectable } from '@nestjs/common';
import { applyPaginationDefaults, wrapPaginatedResponse, PaginationResponse, wrapResponse } from '@kerthin/utils';
import BlogDomainService from '@domain/services/blog-domain.service';
import { BlogDomainEntity } from '@domain/entities/blog-domain.entity';
import { catchGeneralErrors, notFound } from '../utils/catch-errors';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';

@Injectable()
export default class BlogService {

  constructor(
    private readonly domain: BlogDomainService
  ) { }

  async create(blog: CreateBlogDto) {
    return this.domain.create(blog)
      .then(wrapResponse);
  }

  update(id: string, blog: UpdateBlogDto) {
    return this.domain.update({ id, ...blog })
      .then(wrapResponse)
      .catch(catchGeneralErrors);
  }

  remove(id: string) {
    return this.domain.remove(id)
      .then(wrapResponse)
      .catch(catchGeneralErrors);
  }

  findAll(options = {}): Promise<PaginationResponse<BlogDomainEntity>> {
    return this.domain.findAll(applyPaginationDefaults(options))
      .then(wrapPaginatedResponse)
  }

  findOneById(id: string) {
    return this.domain.findOneById(id)
      .then(notFound(`The user with id '${id}' doesn't exists.`))
      .then(wrapResponse)
  }

}
