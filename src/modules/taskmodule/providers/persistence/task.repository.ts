import { Injectable } from '@nestjs/common';
import {
  EntityRepository, Repository,
} from 'typeorm';
import Task from '../../model/entities/task.entity';

@Injectable()
@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {
  public async updateIfExists(task: Task): Promise<Task> {
    if (!await this.taskExists(task)) return Promise.reject(new Error('Entity Not found'));

    return this.save(task);
  }

  public async taskExists(task: Task): Promise<boolean> {
    const result = await this.findOne({ id: task.id });

    return result !== undefined;
  }
}
