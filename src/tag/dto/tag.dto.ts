import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class TagDto {
  @ApiProperty({ minimum: 4, maximum: 254 })
  @MinLength(4)
  @MaxLength(254)
  @IsString()
  name: string;
}
