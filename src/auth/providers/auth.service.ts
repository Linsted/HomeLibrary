import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { UsersService } from 'src/users/providers/users.service';

import { SignInDto } from '../dto/sign-in.dto';
import { HashingProvider } from './hashing.provider';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    /** Injecting UserService,jwtService, jwtConfig and hashingProvider */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /** Sign in user */
  async signIn(signInDto: SignInDto) {
    let user = await this.usersService.findOneByLogin(signInDto.login);

    let isEqual: boolean;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Couldn`t compare password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Wrong password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        login: user.login,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }

  /** Check is user auth */
  public isAuth() {
    return true;
  }
}
