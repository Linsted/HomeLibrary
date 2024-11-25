import { Injectable } from '@nestjs/common';

/** Hashing abstract class */
@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(password: string | Buffer): Promise<string>;

  abstract comparePassword(
    password: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean>;
}
