import { Module } from '@nestjs/common';
import HealthController from './controllers/healthController';
import HealthService from './services/healthService';
import DatabaseModule from '../databaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export default class HealthModule {}
