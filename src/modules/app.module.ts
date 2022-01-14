import { MiddlewareConsumer, Module } from '@nestjs/common';
import HealthModule from './health/health.module';
import DatabaseModule from './database.module';
import TaskModule from './taskmodule/task.module';
import LoggerMiddleware from '../common/middleware/logger.middleware';

@Module({
  imports: [DatabaseModule, TaskModule, HealthModule],
  controllers: [],
  providers: [],
})
export default class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
