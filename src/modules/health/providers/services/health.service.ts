import { Injectable } from '@nestjs/common';

@Injectable()
export default class HealthService {
  // eslint-disable-next-line class-methods-use-this
  getHealth(): string {
    return 'Healthy!';
  }
}
