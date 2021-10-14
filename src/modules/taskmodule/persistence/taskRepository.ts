import { Injectable } from '@nestjs/common';
import {
  EntityRepository, Repository,
} from 'typeorm';
import Task from '../model/entities/Task.entity';

@Injectable()
@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {
  public async updateIfExists(task: Task): Promise<Task> {
    const result = await this.findOne(task.id);
    if (result === undefined) return Promise.reject(new Error('Entity Not found'));

    return this.save({
      ...result,
      ...task,
    });
  }
}
