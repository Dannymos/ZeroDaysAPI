import { Injectable } from '@nestjs/common';
import Mapper from '../../../../interfaces/mapper';
import Task from '../entities/Task.entity';
import TaskDTO from '../../controllers/contracts/task.dto';

@Injectable()
export default class TaskMapper implements Mapper<Task, TaskDTO> {
  toDTO(task: Task): TaskDTO {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      duedate: task.duedate,
    };
  }

  toModel(dto: TaskDTO): Task {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      completed: dto.completed ?? false,
      duedate: dto.duedate,
    };
  }
}
