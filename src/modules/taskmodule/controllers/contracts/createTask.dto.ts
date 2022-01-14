import { PickType } from '@nestjs/mapped-types';
import TaskDTO from './task.dto';

export default class CreateTaskDTO extends PickType(TaskDTO, ['title', 'description', 'duedate', 'parentId']) {
}
