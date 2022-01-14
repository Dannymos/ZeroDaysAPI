import { MiddlewareConsumer, Module } from '@nestjs/common';
import HealthModule from './health/health.module';
import DatabaseModule from './database.module';
import TaskModule from './taskmodule/task.module';
import LoggerMiddleware from '../common/middleware/logger.middleware';
import ProjectModule from './projectmodule/project.module';

@Module({
  imports: [DatabaseModule, TaskModule, ProjectModule, HealthModule],
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
