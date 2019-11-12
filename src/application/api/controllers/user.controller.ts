import { Controller, Get, Post, Body, Patch, Param, HttpStatus, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { ApiResponseCustom } from '../utils/decorators/response.decorator';
import { ApiPaginationResponseCustom } from '../utils/decorators/pagination-response.decorator';
import { BlogDto } from '../dtos/blog.dto';
import BlogService from '../services/blog.service';

@ApiUseTags('blogs')
@Controller('blogs')
export default class BlogController {

  constructor(
    private readonly service: BlogService
  ) { }

  @Post()
  @ApiResponseCustom({ status: HttpStatus.CREATED, type: BlogDto })
  create(@Body() user: CreateBlogDto) {
    return this.service.create(user);
  }

  @Patch(':id')
  @ApiResponseCustom({ status: HttpStatus.OK, type: BlogDto })
  update(@Param('id') id: string, @Body() user: UpdateBlogDto) {
    return this.service.update(id, user);
  }

  @Delete(':id')
  @ApiResponseCustom({ status: HttpStatus.OK, type: class Empty { } })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get()
  @ApiPaginationResponseCustom({ status: HttpStatus.OK, type: BlogDto })
  findAll() {
    return this.service.findAll({});
  }

  @Get(':id')
  @ApiResponseCustom({ status: HttpStatus.OK, type: BlogDto })
  findOneById(@Param('id') id) {
    return this.service.findOneById(id);
  }

}
