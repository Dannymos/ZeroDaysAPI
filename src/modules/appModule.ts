import { Module } from '@nestjs/common';
import HealthModule from './healthmodule/healthModule';
import DatabaseModule from './databaseModule';

@Module({
  imports: [DatabaseModule, HealthModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
