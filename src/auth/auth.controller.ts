import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  AUTH_RESPONSE_SAMPLE,
  CONTROLLER_TAGS,
} from 'src/common/constants/swagger';

import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Public } from './decorators/public.decorator';

/** Auth controller*/
@Controller('/auth')
@ApiTags(CONTROLLER_TAGS.AUTH)
export class AuthController {
  constructor(
    /** Injecting Auth Service */
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  @Public()
  @ApiResponse(AUTH_RESPONSE_SAMPLE.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
