import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TaskDTO from '../../controllers/contracts/task.dto';
import TaskDTOAdapter from '../adapters/taskDTO.adapter';
import TaskRepository from '../persistence/task.repository';

@Injectable()
export default class TaskService {
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository;

  @Inject(TaskDTOAdapter)
  private taskMapper: TaskDTOAdapter;

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
    return this.taskRepository.updateIfExists(this.taskMapper.toModel(dto))
      .then((result) => this.taskMapper.toDTO(result))
      .catch((error) => {
        throw new NotFoundException(error);
      });
  }
}
