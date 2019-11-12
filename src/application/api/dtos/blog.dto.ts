import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { BlogDomainEntity } from '@domain/entities/blog-domain.entity';

export class BlogDto extends BlogDomainEntity {
  @ApiModelPropertyOptional()
  id: string;

  @ApiModelProperty()
  title: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelProperty()
  content: string;

  @ApiModelProperty()
  ownerId: string;

  @ApiModelProperty()
  isPublic: boolean;
}
