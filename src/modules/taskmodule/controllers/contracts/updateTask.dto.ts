import { PickType } from '@nestjs/mapped-types';
import TaskDTO from './task.dto';

export default class UpdateTaskDTO extends PickType(TaskDTO, ['id', 'title', 'description', 'completed', 'duedate', 'parentId']) {
}
