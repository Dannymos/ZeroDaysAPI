import { PickType } from '@nestjs/mapped-types';
import ProjectDTO from './project.dto';

export default class CreateProjectDTO extends PickType(ProjectDTO, ['title', 'description']) {

}
