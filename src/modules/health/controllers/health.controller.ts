import { Controller, Get } from '@nestjs/common';
import HealthService from '../providers/services/health.service';

@Controller()
export default class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  getHealth(): string {
    return this.healthService.getHealth();
  }
}
