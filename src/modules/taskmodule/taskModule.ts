import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './model/entities/Task.entity';
import TaskService from './services/taskService';
import TaskController from './controllers/taskController';
import TaskMapper from './model/mappers/taskMapper';
import TaskRepository from './persistence/taskRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper, Logger],
  exports: [TaskService],
})
export default class TaskModule {}
