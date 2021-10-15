import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import TaskService from '../providers/services/task.service';
import CreateTaskRequest from './contracts/createTaskRequest';
import UpdateTaskRequest from './contracts/updateTaskRequest';

@Controller('task')
export default class TaskController {
  @Inject(Logger)
  private logger: Logger;

  @Inject(TaskService)
  private taskService: TaskService;

  @Post()
  public async create(@Body() request: CreateTaskRequest): Promise<string> {
    try {
      const createdTask = await this.taskService.createTask({
        title: request.title,
        description: request.description,
        duedate: request.duedate,
      });

      return JSON.stringify(createdTask);
    } catch (exception) {
      this.logger.error(exception);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: exception.error,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  public async read(@Param('id') id: string): Promise<string> {
    try {
      const result = await this.taskService.findTaskById(id);

      return JSON.stringify(result);
    } catch (exception) {
      this.logger.error(exception);
      if (exception.status === 404) {
        throw new NotFoundException(exception.response.error);
      } else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: exception.error,
        }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Put()
  public async update(@Body() request: UpdateTaskRequest): Promise<string> {
    try {
      const updatedTask = await this.taskService.updateTask({
        id: request.id,
        title: request.title,
        description: request.description,
        completed: request.completed,
        duedate: request.duedate,
      });

      return JSON.stringify(updatedTask);
    } catch (exception) {
      this.logger.error(exception);
      if (exception.status === 404) {
        throw new NotFoundException(exception.response.error);
      } else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: exception.error,
        }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Delete()
  public async delete(): Promise<void> {
    return Promise.resolve();
  }
}
