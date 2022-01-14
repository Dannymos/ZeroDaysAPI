import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import HealthService from '../providers/services/health.service';

@ApiTags('Health')
@Controller()
export default class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  getHealth(): string {
    return this.healthService.getHealth();
  }
}
