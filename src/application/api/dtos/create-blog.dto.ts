import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { BlogDomainEntity } from '@domain/entities/blog-domain.entity';

export class CreateBlogDto extends BlogDomainEntity {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  id: string;

  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiModelProperty()
  @IsString()
  content: string;

  @ApiModelProperty()
  @IsString()
  ownerId: string;

  @ApiModelProperty()
  @IsBoolean()
  isPublic: boolean;
}
