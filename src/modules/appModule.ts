import { Module } from '@nestjs/common';
import HealthModule from './healthmodule/healthModule';
import DatabaseModule from './databaseModule';
import TaskModule from './taskmodule/taskModule';

@Module({
  imports: [DatabaseModule, TaskModule, HealthModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
