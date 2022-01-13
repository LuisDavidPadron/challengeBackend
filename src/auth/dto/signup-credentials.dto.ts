import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignupCredentialsDto {
  @ApiProperty({ minimum: 4, maximum: 20 })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    minimum: 6,
    maximum: 20,
    description:
      'At least 1 mayuscula, 1 minuscula, 1 caracter especial & 1 numero',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
