import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  AUTH_RESPONSE_SAMPLE,
  CONTROLLER_TAGS,
} from 'src/common/constants/swagger';

import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './providers/auth.service';

/** Auth controller*/
@Controller('/auth')
@ApiTags(CONTROLLER_TAGS.AUTH)
export class AuthController {
  constructor(
    /** Injecting Auth Service */
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  @ApiResponse(AUTH_RESPONSE_SAMPLE.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
