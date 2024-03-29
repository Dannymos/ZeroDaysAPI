import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param, ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import TaskService from '../providers/services/task.service';
import CreateTaskDTO from './contracts/createTask.dto';
import UpdateTaskDTO from './contracts/updateTask.dto';

@ApiTags('Task')
@Controller('task')
export default class TaskController {
  @Inject(TaskService)
  private taskService: TaskService;

  @Post()
  public async create(@Body() request: CreateTaskDTO): Promise<string> {
    try {
      const createdTask = await this.taskService.createTask({
        title: request.title,
        description: request.description,
        duedate: request.duedate ?? null,
        parentId: request.parentId ?? null,
      });

      return JSON.stringify(createdTask);
    } catch (exception) {
      if (exception.status === 404) {
        throw new NotFoundException(exception.message);
      } else {
        throw new BadRequestException(exception.message);
      }
    }
  }

  @Get(':id')
  public async read(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    try {
      const task = await this.taskService.findTaskById(id);

      return JSON.stringify(task);
    } catch (exception) {
      if (exception.status === 404) {
        throw new NotFoundException(exception.message);
      } else {
        throw new BadRequestException(exception.message);
      }
    }
  }

  @Get(':id/children')
  public async findChildren(@Param('id') id: string): Promise<string> {
    try {
      const task = await this.taskService.findChildren(id);

      return JSON.stringify(task);
    } catch (exception) {
      if (exception.status === 404) {
        throw new NotFoundException(exception.message);
      } else {
        throw new BadRequestException(exception.message);
      }
    }
  }

  @Put()
  public async update(@Body() request: UpdateTaskDTO): Promise<string> {
    try {
      const updatedTask = await this.taskService.updateTask({
        id: request.id,
        title: request.title,
        description: request.description,
        completed: request.completed,
        duedate: request.duedate,
        parentId: request.parentId,
      });

      return JSON.stringify(updatedTask);
    } catch (exception) {
      if (exception.status === 404) {
        throw new NotFoundException(exception.message);
      } else {
        throw new BadRequestException(exception.message);
      }
    }
  }

  @Delete()
  public async delete(): Promise<void> {
    return Promise.resolve();
  }
}
