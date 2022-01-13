import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Tags } from '../../tag/entity/tag.entity';
import { tag } from '../../tag/interface/tag.interface';

export class ArticleDto {
  @ApiProperty({ minimum: 4, maximum: 254 })
  @MinLength(4)
  @MaxLength(254)
  @IsString()
  author: string;

  @ApiProperty()
  title: string;

  @IsString()
  comment_text: any;

  @IsString()
  created_at: string;

  tags: Array<Tags>;
}

export class filterDto {
  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  tags: Array<tag>;
}
