import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { BlogDomainEntity } from '@domain/entities/blog-domain.entity';

export class UpdateBlogDto extends BlogDomainEntity {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  content: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  ownerId: string;

  @ApiModelProperty()
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;
}
