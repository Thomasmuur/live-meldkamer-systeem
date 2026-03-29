import { Injectable } from '@nestjs/common';

import packageJson from '../package.json';

@Injectable()
export class AppService {
  public getApiVersion(): string {
    return packageJson.version;
  }
}
