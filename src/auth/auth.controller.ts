import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from './interface/jwt-payload';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return this.authService.signIn(signinCredentialsDto);
  }
}
