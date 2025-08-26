import { Injectable } from '@nestjs/common';

@Injectable()
// 실제 비즈니스 로직을 처리함.
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
