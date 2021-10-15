import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TaskDTO from '../../controllers/contracts/task.dto';
import TaskDTOAdapter from '../adapters/taskDTO.adapter';
import Task from '../../model/entities/task.entity';

@Injectable()
export default class TaskService {
  @InjectRepository(Task)
  private taskRepository: Repository<Task>;

  @Inject(TaskDTOAdapter)
  private taskDTOAdapter: TaskDTOAdapter;

  public async createTask(dto: TaskDTO): Promise<TaskDTO> {
    const task = this.taskRepository.create(this.taskDTOAdapter.toModel(dto));
    return this.taskRepository.save(task)
      .then((result) => this.taskDTOAdapter.toDTO(result));
  }

  public async findTaskById(id: string): Promise<TaskDTO> {
    return this.taskRepository.findOneOrFail({ id })
      .then((result) => this.taskDTOAdapter.toDTO(result));
  }

  public async updateTask(dto: TaskDTO): Promise<TaskDTO> {
    const task = this.taskDTOAdapter.toModel(dto);
    if (!await this.taskExists(task.id)) return Promise.reject(new NotFoundException('Entity not found'));

    return this.taskRepository.save(task)
      .then((result) => this.taskDTOAdapter.toDTO(result));
  }

  private async taskExists(taskId: string): Promise<boolean> {
    const result = await this.taskRepository.findOne({ id: taskId });

    return result !== undefined;
  }
}
