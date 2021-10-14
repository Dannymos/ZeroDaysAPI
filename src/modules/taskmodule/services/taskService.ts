import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TaskDTO from '../controllers/contracts/task.dto';
import TaskMapper from '../model/mappers/taskMapper';
import TaskRepository from '../persistence/taskRepository';

@Injectable()
export default class TaskService {
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository;

  @Inject(TaskMapper)
  private taskMapper: TaskMapper;

  public async hello() {
    return 'hello';
  }

  public async createTask(dto: TaskDTO): Promise<TaskDTO> {
    const task = this.taskRepository.create(this.taskMapper.toModel(dto));
    await this.taskRepository.save(task);

    return this.taskMapper.toDTO(task);
  }

  public async findTaskById(id: string): Promise<TaskDTO> {
    const task = await this.taskRepository.findOneOrFail({ id });

    return this.taskMapper.toDTO(task);
  }

  public async updateTask(dto: TaskDTO): Promise<TaskDTO> {
    const task = await this.taskRepository.updateIfExists(this.taskMapper.toModel(dto));

    return this.taskMapper.toDTO(task);
  }
}
