import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider {
  private readonly saltOrRounds = 10;

  async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, this.saltOrRounds);
  }

  async compare(text: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(text, encrypted);
  }
}
