import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './model/entities/task.entity';
import TaskService from './providers/services/task.service';
import TaskController from './controllers/task.controller';
import TaskDTOAdapter from './providers/adapters/taskDTO.adapter';
import TaskRepository from './providers/persistence/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService, TaskDTOAdapter, Logger],
  exports: [TaskService],
})
export default class TaskModule {}
