import { Injectable } from '@nestjs/common';
import AdapterInterface from '../../../../interfaces/adapter.interface';
import Task from '../../model/entities/task.entity';
import TaskDTO from '../../controllers/contracts/task.dto';

@Injectable()
export default class TaskDTOAdapter implements AdapterInterface<Task, TaskDTO> {
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
