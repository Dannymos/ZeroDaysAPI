import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/healthService';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  getHealth(): string {
    return this.healthService.getHealth();
  }
}
