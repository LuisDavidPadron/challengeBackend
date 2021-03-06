import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from './interface/jwt-payload';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signinCredentialsDto: SignInCredentialsDto): Promise<{
    accessToken: string;
    user: JwtPayload;
  }> {
    const resp = await this.userRepository.validateUserPassword(
      signinCredentialsDto,
    );

    if (!resp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = resp;
    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
      user: resp,
    };
  }

  signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signupCredentialsDto);
  }
}
