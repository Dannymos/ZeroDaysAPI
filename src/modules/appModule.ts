import { Module } from '@nestjs/common';
import { HealthModule } from './healthmodule/healthModule';

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
