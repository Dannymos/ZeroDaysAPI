import { ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import ProjectService from '../providers/services/project.service';
import CreateProjectDTO from './contracts/createProject.dto';
import UpdateProjectDTO from './contracts/updateProject.dto';

@ApiTags('Project')
@Controller('project')
export default class ProjectController {
  @Inject(ProjectService)
  private projectService: ProjectService;

  @Post()
  public async create(@Body() request: CreateProjectDTO): Promise<string> {
    try {
      const createdProject = await this.projectService.createProject({
        title: request.title,
        description: request.title ?? null,
      });

      return JSON.stringify(createdProject);
    } catch (exception) {
      throw new BadRequestException(exception.message);
    }
  }

  @Get(':id')
  public async read(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    try {
      const project = await this.projectService.findProjectById(id);

      return JSON.stringify(project);
    } catch (exception) {
      if (exception.status === 404) {
        throw new NotFoundException(exception.message);
      } else {
        throw new BadRequestException(exception.message);
      }
    }
  }

  @Put()
  public async update(@Body() request: UpdateProjectDTO): Promise<string> {
    try {
      const updatedProject = await this.projectService.updateProject({
        id: request.id,
        title: request.title,
        description: request.description,
      });

      return JSON.stringify(updatedProject);
    } catch (exception) {
      if (exception.status === 404) {
        throw new NotFoundException(exception.message);
      } else {
        throw new BadRequestException(exception.message);
      }
    }
  }
}
