import { Module } from '@nestjs/common';
import HealthController from './controllers/health.controller';
import HealthService from './providers/services/health.service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export default class HealthModule {}
