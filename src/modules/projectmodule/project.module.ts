import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Project from './model/entities/project.entity';
import ProjectService from './providers/services/project.service';
import ProjectController from './controllers/project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export default class ProjectModule {}
