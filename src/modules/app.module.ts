import { Module } from '@nestjs/common';
import HealthModule from './health/health.module';
import DatabaseModule from './database.module';
import TaskModule from './taskmodule/task.module';

@Module({
  imports: [DatabaseModule, TaskModule, HealthModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
