import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './model/entities/task.entity';
import TaskService from './providers/services/task.service';
import TaskController from './controllers/task.controller';
import TaskDTOAdapter from './providers/adapters/taskDTO.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TaskDTOAdapter],
  exports: [TaskService],
})
export default class TaskModule {}
