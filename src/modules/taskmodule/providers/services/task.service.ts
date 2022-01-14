import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from '../../model/entities/task.entity';
import CreateTaskDTO from '../../controllers/contracts/createTask.dto';
import UpdateTaskDTO from '../../controllers/contracts/updateTask.dto';

@Injectable()
export default class TaskService {
  @InjectRepository(Task)
  private taskRepository: Repository<Task>;

  public async createTask(dto: CreateTaskDTO): Promise<Task> {
    const parent = dto.parentId ? await this.findTaskById(dto.parentId) : null;
    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      completed: false,
      duedate: dto.duedate,
      parent,
    });

    return this.taskRepository.save(task)
      .then((result) => result);
  }

  public async findTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOneOrFail({ id })
      .then((result) => result).catch(() => Promise.reject(new NotFoundException('Entity not found')));
  }

  public async updateTask(dto: UpdateTaskDTO): Promise<Task> {
    const task = await this.findTaskById(dto.id);
    const parent = dto.parentId ? await this.findTaskById(dto.parentId) : null;

    task.title = dto.title;
    task.description = dto.description;
    task.completed = dto.completed;
    task.duedate = dto.duedate;
    task.parent = parent;

    return this.taskRepository.save(task)
      .then((result) => result);
  }
}
