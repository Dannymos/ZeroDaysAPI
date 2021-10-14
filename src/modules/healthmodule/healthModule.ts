import { Module } from '@nestjs/common';
import HealthController from './controllers/healthController';
import HealthService from './services/healthService';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export default class HealthModule {}
