import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Project from '../../model/entities/project.entity';
import CreateProjectDTO from '../../controllers/contracts/createProject.dto';
import UpdateProjectDTO from '../../controllers/contracts/updateProject.dto';

@Injectable()
export default class ProjectService {
  @InjectRepository(Project)
  private projectRepository: Repository<Project>;

  public async createProject(dto: CreateProjectDTO): Promise<Project> {
    const project = this.projectRepository.create({
      title: dto.title,
      description: dto.description,
    });

    return this.projectRepository.save(project);
  }

  public async findProjectById(id: string): Promise<Project> {
    return this.projectRepository.findOneOrFail(id)
      .then((result) => result)
      .catch((exception) => Promise.reject(new NotFoundException(exception)));
  }

  public async updateProject(dto: UpdateProjectDTO): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail({ id: dto.id })
      .catch((exception) => Promise.reject(new NotFoundException(exception)));

    project.title = dto.title;
    project.description = dto.description;

    return this.projectRepository.save(project).then((result) => result);
  }
}
