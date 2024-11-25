import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HashingProvider } from './hashing.provider';

/** BCrypt Hashing  class */
@Injectable()
export class BcryptProvider implements HashingProvider {
  /** Password hashing */
  async hashPassword(password: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }

  /** Password comparing */
  comparePassword(
    password: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}
