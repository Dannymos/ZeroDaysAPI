import { PickType } from '@nestjs/mapped-types';
import ProjectDTO from './project.dto';

export default class UpdateProjectDTO extends PickType(ProjectDTO, ['id', 'title', 'description']) {

}
